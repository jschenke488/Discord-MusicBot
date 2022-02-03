const { Router } = require("express");
const api = Router();

// TODO
// Make this actually do something other than return the query strings
api.get("*", (req, res) => {
	if (!req.query || !req.query.code) return res.redirect("/");
	res.type("json");
	res.send(req.query);
});

module.exports = api;
