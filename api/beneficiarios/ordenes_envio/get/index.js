const models = require('./../../../../models');
const {OrdenEnvio, Recurso, Categoria, UnidadDeMedida} = models;

let handler = (req, res) => {
	let id = req.query;
	res.send({id: id});
};