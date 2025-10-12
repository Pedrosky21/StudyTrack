import { Request, Response } from "express";
import subjectService from "../application/Subject.services";
import authService from "../../auth/application/Auth.services";
import { Subject } from "../domain/Subject.entity";
import { SubjectDTO } from "../application/CreateSubject.dto";

class SubjectController {
  async createSubject(req: Request, res: Response) {
    try {
      const subject: SubjectDTO = req.body;
      const auth0UserID = req.oidc?.user?.sub;

      const user = await authService.getUserByAuth0ID(auth0UserID);
      const userID = Number(user?.get("id"));

      subject.userID = userID;

      const subjectCreated = await subjectService.createSubject(subject);
      if (!subjectCreated) {
        res.status(400).json({ message: "No pudo crearse la materia" });
      }

      res.status(201).json(subjectCreated);
    } catch (error) {
      console.log(error);
    }
  }

  async getAllSubjects(req: Request, res: Response) {
    try {
      const user = req.oidc?.user; // auth0
      if (!user) return res.status(401).send("No autenticado");

      const ourUser = await authService.getUserByAuth0ID(user.sub);

      if (!ourUser) {
        throw new Error("Usuario no encontrado");
      }

      const userID = Number(ourUser.get("id"));
      const subjects = await subjectService.getSubjectsByUserID(userID);

      res.status(200).json(subjects);
    } catch (error) {
      console.log(error);
    }
  }

  async getSubjectByID(req: Request, res: Response) {
    try {
      const subjectID = req.params.id;

      const subject = await subjectService.getSubjectByID(Number(subjectID));

      res.status(200).json(subject);
    } catch (error) {
      console.log(error);
    }
  }

  async updateSubject(req: Request, res: Response) {
    try {
      const subject: SubjectDTO = req.body;
      const subjectID = req.params.id;
      subject.userID = req.oidc?.user?.sub;

      const subjectUpdated = await subjectService.updateSubject(
        Number(subjectID),
        subject
      );

      res.status(200).json(subjectUpdated);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteSubject(req: Request, res: Response) {
    try {
      const subjectID = req.params.id;

      await subjectService.deleteSubject(Number(subjectID));

      res
        .status(200)
        .json({ message: `Materia de id ${subjectID} eliminada.` });
    } catch (error) {
      console.log(error);
    }
  }

  async countCompletedTopics(req: Request, res: Response) {
    try {
      const subjectID = Number(req.params.id);

      const counted = await subjectService.countCompletedTopics(
        Number(subjectID)
      );

      res.status(200).json(counted);
    } catch (error) {
      console.log(error);
    }
  }
}

export default new SubjectController();
