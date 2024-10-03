import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async findAll(): Promise<Task[]> {
    return this.tasksService.findAll();
  }
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.findOne(id);
  }
  @Post()
  async create(@Body() task: Task): Promise<Task> {
    return this.tasksService.create(task);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.tasksService.remove(+id);
  }
}
