import SubjectModel from "./Subject.model";
import UnitModel from "../../unit/infraestructure/Unit.model";
import TopicModel from "../../topic/infraestructure/Topic.model";
import TopicProgressModel from "../../topic/infraestructure/TopicProgress.model";
import { SubjectDTO } from "../application/CreateSubject.dto";
import sequelize from "../../../config/db.config";
import { Op } from "sequelize";

class SubjectRepository {
  async getSubjectsByUserID(userID: number): Promise<SubjectModel[]> {
    return await SubjectModel.findAll({
      where: { user_id: userID },
      include: [
        {
          model: UnitModel,
          as: "units",
          include: [
            {
              model: TopicModel,
              as: "topics",
              include: [
                {
                  model: TopicModel,
                  as: "children",
                  include: [{ model: TopicProgressModel, as: "topicProgress" }],
                },
                {
                  model: TopicProgressModel,
                  as: "topicProgress",
                },
              ],
            },
          ],
        },
      ],
    });
  }

  async getSubjectByID(subjectID: number): Promise<SubjectModel | null> {
    return await SubjectModel.findByPk(subjectID, {
      include: [
        {
          model: UnitModel,
          as: "units",
          include: [
            {
              model: TopicModel,
              as: "topics",
              include: [
                {
                  model: TopicProgressModel,
                  as: "topicProgress",
                },
              ],
            },
          ],
        },
      ],
    });
  }

  async createSubject(subject: SubjectDTO): Promise<SubjectModel> {
    return await SubjectModel.create(
      {
        title: subject.title,
        description: subject.description,
        imageURL: subject.imageURL,
        user_id: subject.userID,
        units: subject.units?.map((unit) => ({
          title: unit.title,
          order: unit.order,
          topics: unit.topics?.map((topic) => ({
            title: topic.title,
            order: topic.order,
          })),
        })),
      },
      {
        include: [
          {
            model: UnitModel,
            as: "units",
            include: [
              {
                model: TopicModel,
                as: "topics",
              },
            ],
          },
        ],
      }
    );
  }

  async updateSubject(subjectID: number, subjectData: SubjectDTO) {
    const transaction = await sequelize.transaction();

    try {
      // --- Actualizar datos básicos del Subject ---
      await SubjectModel.update(
        { title: subjectData.title, description: subjectData.description },
        { where: { id: subjectID }, transaction }
      );

      // Obtener el subject con Units y Topics actuales
      const subjectToUpdate = await this.getSubjectByID(subjectID);

      // --- Eliminar Units que ya no existen ---
      if (subjectToUpdate?.get("units")) {
        for (const unit of subjectToUpdate.get("units") as UnitModel[]) {
          const stillExists = subjectData.units?.some(
            (u) => u.id === unit.get("id")
          );
          if (!stillExists) {
            await TopicModel.destroy({
              where: { unit_id: unit.get("id") },
              transaction,
            });
            await UnitModel.destroy({
              where: { id: unit.get("id") },
              transaction,
            });
          }
        }
      }

      // --- Crear o actualizar Units ---
      if (subjectData.units?.length) {
        for (const unit of subjectData.units) {
          let unitRecord = unit.id
            ? await UnitModel.findByPk(unit.id, { transaction })
            : null;

          // Si existe la unidad, actualizar
          if (unitRecord) {
            await UnitModel.update(
              { title: unit.title, subject_id: subjectID },
              { where: { id: unit.id }, transaction }
            );
          } else {
            // Si no existe, crear nueva
            unitRecord = await UnitModel.create(
              { title: unit.title, subject_id: subjectID },
              { transaction }
            );
          }
          // --- Eliminar Topics que ya no existen ---
          const existingTopics = await TopicModel.findAll({
            where: { unit_id: unitRecord.get("id") },
            transaction,
          });

          for (const existing of existingTopics) {
            const stillExists = unit.topics?.some(
              (t) => t.id === existing.get("id")
            );
            if (!stillExists) {
              await TopicModel.destroy({
                where: { id: existing.get("id") },
                transaction,
              });
            }
          }
          // --- Manejar Topics dentro de la unidad ---
          if (unit.topics?.length) {
            for (const topic of unit.topics) {
              let topicRecord = topic.id
                ? await TopicModel.findByPk(topic.id, { transaction })
                : null;
              if (topicRecord) {
                await TopicModel.update(
                  { title: topic.title, unit_id: unitRecord.get("id") },
                  { where: { id: topic.id }, transaction }
                );
              } else {
                await TopicModel.create(
                  { title: topic.title, unit_id: unitRecord.get("id") },
                  { transaction }
                );
              }
            }
          } else {
            // Si ya no tiene topics, eliminar todos los de esa unidad
            await TopicModel.destroy({
              where: { unit_id: unitRecord.get("id") },
              transaction,
            });
          }
        }
      }

      // Confirmar transacción
      await transaction.commit();

      // Devolver el subject actualizado
      return await this.getSubjectByID(subjectID);
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async deleteSubject(subjectID: number): Promise<number> {
    return await SubjectModel.destroy({
      where: { id: subjectID },
    });
  }

  async countCompletedTopics(subjectID: number): Promise<number> {
    return await TopicProgressModel.count({
      where: { completed_date: { [Op.ne]: null } },
      include: [
        {
          model: TopicModel,
          required: true,
          include: [
            {
              model: UnitModel,
              required: true,
              include: [
                {
                  model: SubjectModel,
                  required: true,
                  where: { id: subjectID },
                },
              ],
            },
          ],
        },
      ],
    });
  }
}

export default new SubjectRepository();
