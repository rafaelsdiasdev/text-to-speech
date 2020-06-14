const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

const Comments = require("../models/Comments");

const connection = new Sequelize(dbConfig);

Comments.init(connection);

module.exports = connection;
