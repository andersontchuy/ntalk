module.exports = (app) => {
	let autenticar = require('./../middleware/autenticador'),
		buscaToken = require('./../middleware/busca-token'), 
		contatos = app.controllers.contatos;
	
	app.use(buscaToken);	
	app.get('/contatos', autenticar, contatos.index);
	app.get('/contato/:id', autenticar, contatos.show);
	app.post('/contato', autenticar, contatos.create);
	app.get('/contato/:id/editar', autenticar, contatos.edit);
	app.put('/contato/:id', autenticar, contatos.update);
	app.delete('/contato/:id', autenticar, contatos.destroy);
};