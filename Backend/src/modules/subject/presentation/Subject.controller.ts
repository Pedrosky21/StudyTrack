import { Request, Response } from "express";
import subjectService from "../application/Subject.services";
import authService from "../../auth/application/Auth.services";
import { Subject } from "../domain/Subject.entity";

class SubjectController {
  async create(req: Request, res: Response) {
    try {
      const subject: Subject = req.body;
      subject.userID = req.oidc?.user?.sub

      const subjectCreated = subjectService.createSubject(subject);
      if (!subjectCreated) {
        res.status(400).json({ message: "No pudo crearse la materia" });
      }

      res.status(201).json(subjectCreated);
    } catch (error) {
      console.log(error);
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const user = req.oidc?.user; // auth0
      if (!user) return res.status(401).send("No autenticado");

      const ourUser = await authService.getUserByAuth0ID(user.sub);

      if (!ourUser) {
        throw new Error("Usuario no encontrado");
      }

      const userID = Number(ourUser.get("id"));
      const subjects = await subjectService.getSubjectByID(userID);

      res.status(200).json(subjects);
    } catch (error) {
      console.log(error);
    }
  }

  async updateSubject(req:Request, res:Response) {
    try {
      const subject:Subject = req.body;
      subject.userID = req.oidc?.user?.sub

      const subjectUpdated = subjectService.updateSubject(Number(subject.id), subject);

      res.status(200).json(subjectUpdated);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteSubject(req:Request, res:Response) {
    try {
      const subjectID = req.params.id

      await subjectService.deleteSubject(Number(subjectID));

      res.status(200).json({message: `Materia de id ${subjectID} eliminada.`})
    } catch (error) {
      console.log(error);
    }
  }
}

export default new SubjectController();
