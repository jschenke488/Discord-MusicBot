const { Router } = require("express");
const api = Router();

// TODO
// Return actual commands list
api.get("*", (req, res) => {
	res.type("json");
	res.send({
		commands: [
			{
				name: "never"
			},
			{
				name: "gonna"
			},
			{
				name: "give"
			},
			{
				name: "you"
			},
			{
				name: "up"
			},
			{
				name: "never"
			},
			{
				name: "gonna"
			},
			{
				name: "let"
			},
			{
				name: "you"
			},
			{
				name: "down"
			}
		]
	});
});

module.exports = api;
