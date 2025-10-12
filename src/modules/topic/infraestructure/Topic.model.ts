import { DataTypes, Model } from "sequelize";
import sequelize from "../../../config/db.config";

class TopicModel extends Model {}

TopicModel.init(
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
    unit_id: {
        type: DataTypes.INTEGER,
        field: "unidad_id"
    },
    topic_father_id: {
        type: DataTypes.INTEGER,
        field: "tema_padre_id"
    }
  },
  {
    sequelize,
    modelName: "Topic",
    tableName: "tema",
    timestamps: false,
  }
);

TopicModel.hasMany(TopicModel, {foreignKey: "topic_father_id", as: "children"});
TopicModel.belongsTo(TopicModel, {foreignKey: "topic_father_id", as: "father"});

export default TopicModel;
