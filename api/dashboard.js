const { Router } = require("express");
const api = Router();
const getConfig = require("../util/getConfig");

let config;
getConfig()
	.then((conf) => {
		config = conf;
	})
	.catch((err) => {
		throw Error(err);
	});

// TODO
// Only redirect if not authorized
// Add actual dashboard when authorized
api.get("*", (req, res) => {
	if (!config) return res.sendStatus(500);
	if (!req.query || !req.query.state) return res.redirect("/");
	res.redirect(`https://discord.com/oauth2/authorize?client_id=${config.clientId}&scope=${config.scopes.filter(scope => scope != "bot" && scope != "applications.commands").join("%20")}&redirect_uri=${config.website}${config.callbackURL}&response_type=code&state=${req.query.state}`);
});

module.exports = api;
