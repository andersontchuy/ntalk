module.exports = (app) => {
	let ChatController = {
		index: (req, res) => {
			let params = {email: req.params.email};
			res.render('chat/index', params);
		}
	};
	return ChatController;
};