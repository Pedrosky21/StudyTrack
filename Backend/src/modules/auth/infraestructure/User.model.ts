import { DataTypes, Model } from "sequelize";
import sequelize from "../../../config/db.config";
import SubjectModel from "../../subject/infraestructure/Subject.model";

class UserModel extends Model {}

UserModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "nombre"
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
      field: "email"
    },
    auth0_id: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "auth0_id"
    },
  },
  {
    sequelize,
    modelName: "UserModel",
    tableName: "usuario",
    timestamps: false,
  }
);

UserModel.hasMany(SubjectModel, {foreignKey: "user_id"});
SubjectModel.belongsTo(UserModel, {foreignKey: "user_id"});

export default UserModel;
