const express = require("express");
const routes = express.Router();

const {
  getTokens,
  getSpecificToken,
  postToken,
  updateToken,
  deleteToken
} = require("../controller/controller");

routes.get("/", getTokens);
routes.get("/:id", getSpecificToken);
routes.post("/", postToken);
routes.put('/:id', updateToken);
routes.delete('/:id', deleteToken)

module.exports = routes;
