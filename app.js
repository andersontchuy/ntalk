const KEY = 'ntalk.sid', SECRET = 'ntalk';
let express = require('express'), 
	  consign = require('consign'),
	  session = require('express-session'),
	  cookieParser = require('cookie-parser'),
	  methodOverride = require('method-override'),
	  bodyParser = require('body-parser'),
	  app = express(),
	  error = require('./middleware/error'),
	  server = require('http').createServer(app),
	  io = require('socket.io').listen(server),
	  cookie = cookieParser(SECRET),
	  store = new session.MemoryStore();
	
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(cookie);
app.use(session({
	secret: SECRET,
	name: KEY,
	resave: true,
	saveUninitialized: true,
	store: store,
	//cookie: { secure: false } 
}));
app.use(methodOverride('_method'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

/*io.set('authorization', (data, accept) => {
	cookie(data, {}, (err) => {
		let sessionID = data.signedCookies[KEY];
		store.get(sessionID, (err, session) => {
			if (err || !session) {
				accept(null, false);
			} else {
				data.session = session;
				accept(null, true);
			}
		});
	});
});*/

consign()
	.include('models')
	.then('controllers')
	.then('routes')
	.into(app);
consign()
	.include('sockets')
	.into(io);	

io.use((socket, next) => {
	let data = socket.request;
	cookie(data, {}, (err) => {
		let sessionID = data.signedCookies[KEY];
		store.get(sessionID, (err, session) => {
			if (err || !session) {
				return next(new Error('Acesso negado!'));
			} else {
				socket.handshake.session = session;
				return next();
			}
		});
	});
});

app.use(error.serverError);
app.use(error.notFound);

server.listen(3000, () => {
	console.log("Ntalk no ar.");
});
