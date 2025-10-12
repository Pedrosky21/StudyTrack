import { DataTypes, Model } from "sequelize";
import sequelize from "../../../config/db.config";
import TopicModel from "./Topic.model";
import UserModel from "../../auth/infraestructure/User.model";

class TopicProgressModel extends Model {}

TopicProgressModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "id",
    },
    completed_date: {
      type: DataTypes.NOW,
      field: "fecha_completado",
    },
    topic_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "tema_id",
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "usuario_id",
    },
  },
  {
    sequelize,
    modelName: "TopicProgress",
    tableName: "progreso_tema",
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ["usuario_id", "tema_id"],
      },
    ],
  }
);

TopicProgressModel.belongsTo(TopicModel, {
  foreignKey: "topic_id",
  onDelete: "CASCADE",
});
TopicModel.hasOne(TopicProgressModel, {
  foreignKey: "topic_id", as: "topicProgress"
});

TopicProgressModel.belongsTo(UserModel, {
  foreignKey: "user_id",
});
UserModel.hasMany(TopicProgressModel, {
  foreignKey: "user_id",
});

export default TopicProgressModel;
