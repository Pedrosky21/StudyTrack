import { DataTypes, Model } from "sequelize";
import sequelize from "../../../config/db.config";
import TopicModel from "../../topic/infraestructure/Topic.model";

class UnitModel extends Model {}

UnitModel.init(
  {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        field: "titulo"
    },
    description: {
        type: DataTypes.STRING,
        field: "descripcion"
    },
    order: {
        type: DataTypes.INTEGER,
        field: "orden"
    },
    subject_id: {
        type: DataTypes.INTEGER,
        field: "materia_id"
    }
  },
  {
    sequelize,
    modelName: "UnitModel",
    tableName: "unidad",
    timestamps: false,
  }
);

UnitModel.hasMany(TopicModel, {foreignKey: "unit_id", as: "topics"});
TopicModel.belongsTo(UnitModel, {foreignKey: "unit_id", onDelete: "CASCADE"});

export default UnitModel;
