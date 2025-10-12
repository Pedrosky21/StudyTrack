import { Topic } from "../domain/Topic.entity";
import topicRepository from "../infraestructure/Topic.repository";

class TopicService {
  async createTopic(topic: Topic) {
    return await topicRepository.createTopic(topic);
  }

  async editTopic(topicID: number, completed_date: Date | null) {
    return await topicRepository.editTopic(topicID, completed_date);
  }

  async toggleTopicProgress(
    topicID: number,
    userID: number,
    completed: Date | null
  ) {
    const progress = await topicRepository.toggleTopicProgress(
      topicID,
      userID,
      completed
    );
    
    return progress;
  }

  async deleteTopic(topicID: number) {
    return await topicRepository.deleteTopic(topicID);
  }
}

export default new TopicService();
