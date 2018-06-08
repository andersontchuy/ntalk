module.exports = (io) => {
	let crypto = require('crypto'),
			md5 = crypto.createHash('md5'),
			sockets = io.sockets;
	
	sockets.on('connection', (client) => {
		let session = client.handshake.session,
				usuario = session.usuario;
		
		/*client.on('send-server', (msg) => {
			msg = "<b id='chat-user-name'>"+usuario.nome+":</b> "+msg+"<br>";
			console.log(msg);
			client.get('sala', (erro, sala) => {
				let data = {email: usuario.email, sala: sala};
				client.broadcast.emit('new-message', data);
				sockets.in(sala).emit('send-client', msg);
			});
		});*/

		client.on('send-server', (msg) => {
			msg = "<b id='chat-user-name'>"+usuario.nome+":</b> "+msg+"<br>";
				let sala = Object.keys(client.rooms);
				console.log(usuario.nome+'-sala: ' + sala);
				let	data = {email: usuario.email, sala: sala};
				client.broadcast.emit('new-message', data);
				sockets.in(sala).emit('send-client', msg);
		});
		
		/*client.on('join', (sala) => {
			if (sala) {
				sala = sala.replace('?','');
			} else {
				let timestamp = new Date().toString(),
						md5 = crypto.createHash('md5');
				sala = md5.update(timestamp).digest('hex');
			}
			client.set('sala', sala);
			client.join(sala);
		});*/

		client.on('join', (sala) => {
			if (sala) {
				sala = sala.toString().replace('?','');
			} else {
				let timestamp = new Date().toString(),
						md5 = crypto.createHash('md5');
				sala = md5.update(timestamp).digest('hex');
				console.log('hash: '+sala);
			}
			client.join(sala, () => {
				sockets.to(sala, 'Novo usuário entrou na sala');
			});
		});
		
		client.on('disconnect', (sala) => {
			client.leave(sala);
		});

	});
}