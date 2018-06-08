module.exports = (app) => {
	let ContatoController = {
		index: (req, res) => {
			let usuario = req.session.usuario,
				contatos = usuario.contatos,
				params = {usuario: usuario, 
						  contatos: contatos};
			res.render('contatos/index', params);
		},
		create: (req, res) => {
			console.log('create: '+req.method, req.url);
			let contato = req.body.contato,
				usuario = req.session.usuario;
			usuario.contatos.push(contato);
			res.redirect('/contatos');
		},
		show: (req, res) => {
			console.log('show: '+req.method, req.url);
			let id = req.params.id,
				usuario = req.session.usuario,
				contato = req.session.usuario.contatos[id],
				params = {contato: contato, 
						  id: id, 
						  usuario: usuario};
			res.render('contatos/show', params);
		},
		edit: (req, res) => {
			console.log('edit: '+req.method, req.url);
			let id = req.params.id,
				usuario = req.session.usuario,
				contato = usuario.contatos[id],
				params = {usuario: usuario,
						  contato: contato,
						  id: id};
			res.render('contatos/edit', params);
		},
		update: (req, res) => {
			console.log('update: '+req.method, req.url);
			let contato = req.body.contato,
				usuario = req.session.usuario;
			usuario.contatos[req.params.id] = contato;
			res.redirect('/contatos');
		},
		destroy: (req, res) => {
			console.log('destroy: '+req.method, req.url);
			let usuario = req.session.usuario,
				id = req.params.id;
			usuario.contatos.splice(id, 1);
			res.redirect('/contatos');
		},
	}
	return ContatoController;
};