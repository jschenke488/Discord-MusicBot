const { Router } = require("express");
const api = Router();
const getConfig = require("../../util/getConfig");

let config;
getConfig()
	.then((conf) => {
		config = conf;
	})
	.catch((err) => {
		throw Error(err);
	});

api.get("*", (req, res) => {
	if (!config) return res.sendStatus(500);
	res.type("json");
	res.send({
		ClientID: config.clientId,
		Permissions: config.permissions,
		Scopes: config.scopes,
		Website: config.website,
		CallbackURL: config.callbackURL,
	});
});

module.exports = api;
