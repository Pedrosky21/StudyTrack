import { Subject } from "../domain/Subject.entity";
import subjectRepository from "../infraestructure/Subject.repository";
import { SubjectDTO } from "./CreateSubject.dto";

class SubjectService {
    async getSubjectsByUserID(userID: number) {
        return await subjectRepository.getSubjectsByUserID(userID);
    }

    async getSubjectByID(subject_id: number) {
        return await subjectRepository.getSubjectByID(subject_id);
    }

    async createSubject(subject: SubjectDTO) {
        return await subjectRepository.createSubject(subject);
    }

    async updateSubject(subjectID: number, subjectData: SubjectDTO) {
        return await subjectRepository.updateSubject(subjectID, subjectData);
    }

    async deleteSubject(subjectID: number) {
        return await subjectRepository.deleteSubject(subjectID);
    }

    async countCompletedTopics(subjectID: number) {
        return await subjectRepository.countCompletedTopics(subjectID);
    }
}

export default new SubjectService();
