module.exports = (app) => {
	let home = app.controllers.home;
	
	app.get('/', home.index);
	app.post('/entrar', home.login);
	app.get('/sair', home.logout);
};