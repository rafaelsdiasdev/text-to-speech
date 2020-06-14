require("dotenv").config();

module.exports = {
  dialect: "postgres",
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  define: {
    timestamps: true,
    underscored: true,
  },
};
