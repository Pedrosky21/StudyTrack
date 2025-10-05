import SubjectModel from "./Subject.model";
import {Subject} from "../domain/Subject.entity";

class SubjectRepository {
  async getSubjectByUserID(userID: number): Promise<SubjectModel[]> {
    return await SubjectModel.findAll({
      where: { userID }
    });
  }

  async getSubjectByID(subjectID: number): Promise<SubjectModel | null> {
    return await SubjectModel.findByPk(subjectID);
  }

  async createSubject(subject: Subject): Promise<SubjectModel> {
    return await SubjectModel.create(
      {
        title: subject.title,
        description: subject.description,
        imageURL: subject.imageURL,
        userID: subject.userID
      }
    )
  }

  async updateSubject(subjectID: number, subjectData: Subject): Promise<[number, SubjectModel[]]> {
    const updateData = subjectData
    return await SubjectModel.update(updateData, 
      {
        where: {id: subjectID},
        returning: true
      }
    )
  }

  async deleteSubject(subjectID: number): Promise<number> {
    return await SubjectModel.destroy(
      {
        where: {id: subjectID}
      }
    )
  }
}

export default new SubjectRepository();
