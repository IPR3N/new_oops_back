import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFiles,
  ParseIntPipe,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ProjectMediaService } from './project-media.service';
import { CreateProjectMediaDto } from './dto/create-project-media.dto';
import { UpdateProjectMediaDto } from './dto/update-project-media.dto';
import { ProjectMedia } from './entities/project-media.entity';
import { FilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('project-media')
export class ProjectMediaController {
  constructor(private readonly projectMediaService: ProjectMediaService) {}

  @Post()
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: './uploads/project-media',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
          return callback(new Error('Only image files are allowed!'), false);
        }
        callback(null, true);
      },
    }),
  )
  create(
    @Body() createProjectMediaDto: CreateProjectMediaDto,
    @UploadedFiles() files: Express.Multer.File[],
  ): Promise<ProjectMedia[]> {
    return this.projectMediaService.create(createProjectMediaDto, files);
  }

  @Get()
  findAll(): Promise<ProjectMedia[]> {
    return this.projectMediaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<ProjectMedia> {
    return this.projectMediaService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
          return callback(new Error('Only image files are allowed!'), false);
        }
        callback(null, true);
      },
    }),
  )
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProjectMediaDto: UpdateProjectMediaDto,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<ProjectMedia> {
    return this.projectMediaService.update(id, updateProjectMediaDto, file);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.projectMediaService.remove(id);
  }
}
