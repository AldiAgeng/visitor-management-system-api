import { FaceRecognitionRepository } from '../repositories/face-recognition.repository';

export class FaceRecognitionService {
  protected faceRecognitionRepository: FaceRecognitionRepository;

  constructor() {
    this.faceRecognitionRepository = new FaceRecognitionRepository();
  }

  async list(data: any) {
    return await this.faceRecognitionRepository.list(data);
  }

  async show(id: number) {
    return [];
  }

  async create(data: any) {
    return await this.faceRecognitionRepository.create(data);
  }

  async info(data: any) {
    return await this.faceRecognitionRepository.info(data);
  }

  async listVisitorRecord(data: any) {
    return await this.faceRecognitionRepository.listVisitorRecord(data);
  }
}
