module.exports = (app) => {
	var HomeController = {
		index: (req, res) => {
			res.render('home/index');
		},
		login: (req, res) => {
			let email = req.body.usuario.email,
				nome = req.body.usuario.nome;
			if (email && nome) {
				let usuario = req.body.usuario;
				usuario['contatos'] = [];
				req.session.usuario = usuario;
				res.redirect('/contatos');
				console.log('Usuário: ' + usuario.nome + ' conectado');
			} else {
				res.redirect('/');
			}
		},
		logout: (req, res) => {
			console.log('Usuário: ' + req.session.usuario.nome + ' desconectado');
			req.session.destroy();
			res.redirect('/');
		}
	};
	return HomeController;
};