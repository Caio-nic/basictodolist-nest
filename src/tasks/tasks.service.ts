import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async findAll(): Promise<Task[]> {
    return this.tasksRepository.find();
  }

  async create(task: Task): Promise<Task> {
    return this.tasksRepository.save(task);
  }

  async remove(id: number): Promise<void> {
    await this.tasksRepository.delete(id);
  }
  async findOne(id: number): Promise<Task> {
    const product = await this.tasksRepository.findOneBy({ id });

    if (!product) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return product;
  }
}
