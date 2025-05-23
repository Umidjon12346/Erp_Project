import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StudentgroupService } from './studentgroup.service';
import { CreateStudentgroupDto } from './dto/create-studentgroup.dto';
import { UpdateStudentgroupDto } from './dto/update-studentgroup.dto';

@Controller('studentgroup')
export class StudentgroupController {
  constructor(private readonly studentgroupService: StudentgroupService) {}

  @Post()
  create(@Body() createStudentgroupDto: CreateStudentgroupDto) {
    return this.studentgroupService.create(createStudentgroupDto);
  }

  @Get()
  findAll() {
    return this.studentgroupService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentgroupService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentgroupDto: UpdateStudentgroupDto) {
    return this.studentgroupService.update(+id, updateStudentgroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentgroupService.remove(+id);
  }
}
