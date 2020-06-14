const express = require("express");
const CommentsController = require("./controllers/CommentsController");

const routes = express.Router();

routes.get("/comments", CommentsController.index);
routes.get("/audio/:comment_id", CommentsController.audio);
routes.post("/comments", CommentsController.store);

module.exports = routes;
