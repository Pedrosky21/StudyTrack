import { Topic } from "../domain/Topic.entity";
import TopicModel from "./Topic.model";
import TopicProgressModel from "./TopicProgress.model";

class TopicRepository {
  async createTopic(topic: Topic) {
    return await TopicModel.create({
      title: topic.title,
      description: topic.title,
      order: topic.order,
      unit_id: topic.unit_id,
      topic_father_id: topic.topic_father_id,
    });
  }

  async editTopic(topicID: number, completed_date: Date | null) {
    return await TopicModel.update(
      { completed_date: completed_date },
      {
        where: { id: topicID },
      }
    );
  }

  async toggleTopicProgress(
    topicID: number,
    userID: number,
    completed: Date | null
  ) {
    const [progress, created] = await TopicProgressModel.findOrCreate({
      where: { topic_id: topicID, user_id: userID },
      defaults: { completed_date: completed ? new Date() : null },
    });

    if (!created) {
      // ya existía, actualizamos el campo completed
      await progress.update({
        completed_date: completed ? new Date() : null,
      });
    }

    return progress;
  }

  async deleteTopic(topicID: number) {
    return await TopicModel.destroy({
      where: { id: topicID },
    });
  }
}

export default new TopicRepository();
