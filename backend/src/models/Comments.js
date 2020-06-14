const { Model, DataTypes } = require("sequelize");

class Comments extends Model {
  static init(sequelize) {
    super.init(
      {
        text: DataTypes.STRING,
        voice: DataTypes.STRING,
        accept: DataTypes.STRING,
        name_archive: DataTypes.STRING,
      },
      {
        sequelize,
      }
    );
  }
}

module.exports = Comments;
