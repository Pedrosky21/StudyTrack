import { Subject } from "../domain/Subject.entity";
import subjectRepository from "../infraestructure/Subject.repository";

class SubjectService {
    async getSubjects(userID: number) {
        return await subjectRepository.getSubjectByUserID(userID);
    }

    async getSubjectByID(subject_id: number) {
        return await subjectRepository.getSubjectByID(subject_id);
    }

    async createSubject(subject: Subject) {
        return await subjectRepository.createSubject(subject);
    }

    async updateSubject(subjectID: number, subjectData: Subject) {
        return await subjectRepository.updateSubject(subjectID, subjectData);
    }

    async deleteSubject(subjectID: number) {
        return await subjectRepository.deleteSubject(subjectID);
    }
}

export default new SubjectService();
