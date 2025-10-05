import { DataTypes, Model } from "sequelize";
import sequelize from "../../../config/db.config";
import UnitModel from "../../unit/Unit.model";

class SubjectModel extends Model {}

SubjectModel.init(
  {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "titulo"
    },
    desciption: {
        type: DataTypes.STRING,
        field: "descripcion"
    },
    imageURL: {
        type: DataTypes.STRING,
        field: "imagenURL"
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "usuario_id"
    }
  },
  {
    sequelize,
    modelName: "SubjectModel",
    tableName: "materia",
    timestamps: false
  }
);

SubjectModel.hasMany(UnitModel, {foreignKey: "subject_id"});
UnitModel.belongsTo(SubjectModel, {foreignKey: "subject_id"});

export default SubjectModel;
