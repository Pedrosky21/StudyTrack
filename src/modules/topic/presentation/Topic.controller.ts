import { Request, Response } from "express";
import topicServices from "../application/Topic.services";
import authServices from "../../auth/application/Auth.services";
import { Topic } from "../domain/Topic.entity";

class TopicController {
  async createTopic(req: Request, res: Response) {
    try {
      const topic: Topic = req.body;

      const topicCreated = await topicServices.createTopic(topic);

      if (!topicCreated) {
        res.status(400).json({ message: "No pudo crearse la materia" });
      }

      res.status(201).json(topicCreated);
    } catch (error) {
      console.log(error);
    }
  }

  async editTopic(req: Request, res: Response) {
    try {
      const topicID = req.params.id
      const {completed_date} = req.body;

      const topicUpdated = await topicServices.editTopic(Number(topicID), completed_date);

      res.status(200).json(topicUpdated);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteTopic(req: Request, res: Response) {
    try {
      const topicID = req.params.id;

      await topicServices.deleteTopic(Number(topicID));

      res.status(200).json({ message: `Tema de id ${topicID} eliminado.` });
    } catch (error) {
      console.log(error);
    }
  }

  async toggleTopicProgress(req: Request, res: Response) {
    try {
      const topicID = req.params.id
      const { completed_date } = req.body;
      const user = req.oidc?.user; // auth0
      if (!user) return res.status(401).send("No autenticado");

      const ourUser = await authServices.getUserByAuth0ID(user.sub);

      if (!ourUser) {
        throw new Error("Usuario no encontrado");
      }

      const userID = Number(ourUser.get("id"));

      const progress = await topicServices.toggleTopicProgress(
        Number(topicID),
        Number(userID),
        completed_date
      );

      res.status(200).json(progress);
    } catch (error) {
      console.log(error);
    }
  }
}

export default new TopicController();
