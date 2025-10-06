// // import {
// //   Controller,
// //   Get,
// //   Post,
// //   Body,
// //   Patch,
// //   Param,
// //   Delete,
// //   UseGuards,
// //   Request,
// //   UseInterceptors,
// //   UploadedFile,
// //   BadRequestException,
// //   Logger,
// // } from '@nestjs/common';
// // import { ProjectMessagesService } from './project_messages.service';
// // import { CreateProjectMessageDto } from './dto/create-project_message.dto';
// // import { UpdateProjectMessageDto } from './dto/update-project_message.dto';
// // import { FileInterceptor } from '@nestjs/platform-express';
// // import { diskStorage } from 'multer';
// // import { extname } from 'path';

// // @Controller('project-messages')
// // export class ProjectMessagesController {
// //   private readonly logger = new Logger('ProjectMessagesController');

// //   constructor(
// //     private readonly projectMessagesService: ProjectMessagesService,
// //   ) {}

// //   @Post()
// //   async create(
// //     @Body() createProjectMessageDto: CreateProjectMessageDto,
// //     @Request() req,
// //   ) {
// //     this.logger.log(
// //       `Création message pour utilisateur ${req.user.id}, projet ${createProjectMessageDto.projectId}`,
// //     );
// //     const userId = req.user.id;
// //     const message = await this.projectMessagesService.create(
// //       createProjectMessageDto,
// //       userId,
// //     );
// //     this.logger.log(`Message créé : ${JSON.stringify(message)}`);
// //     return message; // Renvoyer l'objet message au lieu d'une chaîne
// //   }

// //   @Post('upload')
// //   @UseInterceptors(
// //     FileInterceptor('file', {
// //       storage: diskStorage({
// //         destination: './uploads',
// //         filename: (req, file, cb) => {
// //           const randomName = Array(32)
// //             .fill(null)
// //             .map(() => Math.round(Math.random() * 16).toString(16))
// //             .join('');
// //           cb(null, `${randomName}${extname(file.originalname)}`);
// //         },
// //       }),
// //       limits: {
// //         fileSize: 10 * 1024 * 1024,
// //       },
// //       fileFilter: (req, file, cb) => {
// //         const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
// //         if (!allowedTypes.includes(file.mimetype)) {
// //           return cb(new BadRequestException('Type de fichier invalide'), false);
// //         }
// //         cb(null, true);
// //       },
// //     }),
// //   )
// //   async uploadFile(
// //     @UploadedFile() file: Express.Multer.File,
// //     @Body() createProjectMessageDto: CreateProjectMessageDto,
// //     @Request() req,
// //   ) {
// //     this.logger.log(
// //       `Téléchargement fichier pour utilisateur ${req.user.id}, projet ${createProjectMessageDto.projectId}`,
// //     );
// //     if (!file) {
// //       throw new BadRequestException('Aucun fichier téléchargé');
// //     }
// //     const userId = req.user.id;
// //     const message = await this.projectMessagesService.create(
// //       createProjectMessageDto,
// //       userId,
// //       file,
// //     );
// //     this.logger.log(`Message avec fichier créé : ${JSON.stringify(message)}`);
// //     return message;
// //   }

// //   @Get()
// //   async findAll() {
// //     this.logger.log('Récupération de tous les messages');
// //     return this.projectMessagesService.findAll();
// //   }

// //   @Get('project/:projectId')
// //   async findAllByProject(
// //     @Param('projectId') projectId: string,
// //     @Request() req,
// //   ) {
// //     const id = Number(projectId);
// //     if (isNaN(id)) {
// //       this.logger.error(`ID projet invalide : ${projectId}`);
// //       throw new BadRequestException('ID projet invalide');
// //     }
// //     this.logger.log(
// //       `Récupération messages pour projet ${id} par utilisateur ${req.user.id}`,
// //     );
// //     try {
// //       const messages = await this.projectMessagesService.findAllByProject(id);
// //       this.logger.log(
// //         `Retour de ${messages.length} messages pour projet ${id}`,
// //       );
// //       return messages;
// //     } catch (error) {
// //       this.logger.error(
// //         `Erreur lors de la récupération des messages pour projet ${id} : ${error.message}`,
// //       );
// //       throw error;
// //     }
// //   }

// //   @Get(':id')
// //   async findOne(@Param('id') id: string) {
// //     const messageId = Number(id);
// //     if (isNaN(messageId)) {
// //       this.logger.error(`ID message invalide : ${id}`);
// //       throw new BadRequestException('ID message invalide');
// //     }
// //     return this.projectMessagesService.findOne(messageId);
// //   }

// //   @Patch(':id')
// //   async update(
// //     @Param('id') id: string,
// //     @Body() updateProjectMessageDto: UpdateProjectMessageDto,
// //     @Request() req,
// //   ) {
// //     const messageId = Number(id);
// //     if (isNaN(messageId)) {
// //       this.logger.error(`ID message invalide : ${id}`);
// //       throw new BadRequestException('ID message invalide');
// //     }
// //     const userId = req.user.id;
// //     this.logger.log(
// //       `Mise à jour message ${messageId} par utilisateur ${userId}`,
// //     );
// //     return this.projectMessagesService.update(
// //       messageId,
// //       updateProjectMessageDto,
// //       userId,
// //     );
// //   }

// //   @Delete(':id')
// //   async remove(@Param('id') id: string, @Request() req) {
// //     const messageId = Number(id);
// //     if (isNaN(messageId)) {
// //       this.logger.error(`ID message invalide : ${id}`);
// //       throw new BadRequestException('ID message invalide');
// //     }
// //     const userId = req.user.id;
// //     this.logger.log(
// //       `Suppression message ${messageId} par utilisateur ${userId}`,
// //     );
// //     return this.projectMessagesService.remove(messageId, userId);
// //   }
// // }

// import {
//   Controller,
//   Get,
//   Post,
//   Body,
//   Patch,
//   Param,
//   Delete,
//   Request,
//   UseInterceptors,
//   UploadedFile,
//   BadRequestException,
//   Logger,
// } from '@nestjs/common';
// import { ProjectMessagesService } from './project_messages.service';
// import { CreateProjectMessageDto } from './dto/create-project_message.dto';
// import { UpdateProjectMessageDto } from './dto/update-project_message.dto';
// import { FileInterceptor } from '@nestjs/platform-express';
// import { diskStorage } from 'multer';
// import { extname } from 'path';

// @Controller('project-messages')
// export class ProjectMessagesController {
//   private readonly logger = new Logger('ProjectMessagesController');

//   constructor(
//     private readonly projectMessagesService: ProjectMessagesService,
//   ) {}

//   @Post()
//   async create(
//     @Body() createProjectMessageDto: CreateProjectMessageDto,
//     @Request() req,
//   ) {
//     this.logger.log(
//       `Création message pour utilisateur ${req.user.id}, projet ${createProjectMessageDto.projectId}`,
//     );
//     const userId = req.user.id;
//     const message = await this.projectMessagesService.create(
//       createProjectMessageDto,
//       userId,
//     );
//     this.logger.log(`Message créé : ${JSON.stringify(message)}`);
//     return message;
//   }

//   @Post('upload')
//   @UseInterceptors(
//     FileInterceptor('file', {
//       storage: diskStorage({
//         destination: './Uploads',
//         filename: (req, file, cb) => {
//           const randomName = Array(32)
//             .fill(null)
//             .map(() => Math.round(Math.random() * 16).toString(16))
//             .join('');
//           cb(null, `${randomName}${extname(file.originalname)}`);
//         },
//       }),
//       limits: {
//         fileSize: 10 * 1024 * 1024,
//       },
//       fileFilter: (req, file, cb) => {
//         const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
//         if (!allowedTypes.includes(file.mimetype)) {
//           return cb(new BadRequestException('Type de fichier invalide'), false);
//         }
//         cb(null, true);
//       },
//     }),
//   )
//   async uploadFile(
//     @UploadedFile() file: Express.Multer.File,
//     @Body() createProjectMessageDto: CreateProjectMessageDto,
//     @Request() req,
//   ) {
//     this.logger.log(
//       `Téléchargement fichier pour utilisateur ${req.user.id}, projet ${createProjectMessageDto.projectId}`,
//     );
//     if (!file) {
//       throw new BadRequestException('Aucun fichier téléchargé');
//     }
//     const userId = req.user.id;
//     const message = await this.projectMessagesService.create(
//       createProjectMessageDto,
//       userId,
//       file,
//     );
//     this.logger.log(`Message avec fichier créé : ${JSON.stringify(message)}`);
//     return message;
//   }

//   @Get()
//   async findAll() {
//     this.logger.log('Récupération de tous les messages');
//     return this.projectMessagesService.findAll();
//   }

//   @Get('project/:projectId')
//   async findAllByProject(
//     @Param('projectId') projectId: string,
//     @Request() req,
//   ) {
//     const id = Number(projectId);
//     if (isNaN(id)) {
//       this.logger.error(`ID projet invalide : ${projectId}`);
//       throw new BadRequestException('ID projet invalide');
//     }
//     this.logger.log(
//       `Récupération messages pour projet ${id} par utilisateur ${req.user.id}`,
//     );
//     try {
//       const messages = await this.projectMessagesService.findAllByProject(id);
//       this.logger.log(
//         `Retour de ${messages.length} messages pour projet ${id}`,
//       );
//       return messages;
//     } catch (error) {
//       this.logger.error(
//         `Erreur lors de la récupération des messages pour projet ${id} : ${error.message}`,
//       );
//       throw error;
//     }
//   }

//   @Get(':id')
//   async findOne(@Param('id') id: string) {
//     const messageId = Number(id);
//     if (isNaN(messageId)) {
//       this.logger.error(`ID message invalide : ${id}`);
//       throw new BadRequestException('ID message invalide');
//     }
//     return this.projectMessagesService.findOne(messageId);
//   }

//   @Patch(':id')
//   async update(
//     @Param('id') id: string,
//     @Body() updateProjectMessageDto: UpdateProjectMessageDto,
//     @Request() req,
//   ) {
//     const messageId = Number(id);
//     if (isNaN(messageId)) {
//       this.logger.error(`ID message invalide : ${id}`);
//       throw new BadRequestException('ID message invalide');
//     }
//     const userId = req.user.id;
//     this.logger.log(
//       `Mise à jour message ${messageId} par utilisateur ${userId}`,
//     );
//     return this.projectMessagesService.update(
//       messageId,
//       updateProjectMessageDto,
//       userId,
//     );
//   }

//   @Delete(':id')
//   async remove(@Param('id') id: string, @Request() req) {
//     const messageId = Number(id);
//     if (isNaN(messageId)) {
//       this.logger.error(`ID message invalide : ${id}`);
//       throw new BadRequestException('ID message invalide');
//     }
//     const userId = req.user.id;
//     this.logger.log(
//       `Suppression message ${messageId} par utilisateur ${userId}`,
//     );
//     return this.projectMessagesService.remove(messageId, userId);
//   }
// }

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { ProjectMessagesService } from './project_messages.service';
import { CreateProjectMessageDto } from './dto/create-project_message.dto';
import { UpdateProjectMessageDto } from './dto/update-project_message.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('project-messages')
export class ProjectMessagesController {
  private readonly logger = new Logger('ProjectMessagesController');

  constructor(
    private readonly projectMessagesService: ProjectMessagesService,
  ) {}

  @Post()
  async create(
    @Body() createProjectMessageDto: CreateProjectMessageDto,
    @Request() req,
  ) {
    this.logger.log(
      `Création message pour utilisateur ${req.user.id}, projet ${createProjectMessageDto.projectId}`,
    );
    const userId = req.user.id;
    const message = await this.projectMessagesService.create(
      createProjectMessageDto,
      userId,
    );
    this.logger.log(`Message créé : ${JSON.stringify(message)}`);
    return message;
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
      limits: {
        fileSize: 10 * 1024 * 1024,
      },
      fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
        if (!allowedTypes.includes(file.mimetype)) {
          return cb(new BadRequestException('Type de fichier invalide'), false);
        }
        cb(null, true);
      },
    }),
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() createProjectMessageDto: CreateProjectMessageDto,
    @Request() req,
  ) {
    this.logger.log(
      `Téléchargement fichier pour utilisateur ${req.user.id}, projet ${createProjectMessageDto.projectId}`,
    );
    if (!file) {
      throw new BadRequestException('Aucun fichier téléchargé');
    }
    const userId = req.user.id;
    const message = await this.projectMessagesService.create(
      createProjectMessageDto,
      userId,
      file,
    );
    this.logger.log(`Message avec fichier créé : ${JSON.stringify(message)}`);
    return message;
  }

  @Get()
  async findAll() {
    this.logger.log('Récupération de tous les messages');
    return this.projectMessagesService.findAll();
  }

  @Get('project/:projectId')
  async findAllByProject(
    @Param('projectId') projectId: string,
    @Request() req,
  ) {
    const id = Number(projectId);
    if (isNaN(id)) {
      this.logger.error(`ID projet invalide : ${projectId}`);
      throw new BadRequestException('ID projet invalide');
    }
    this.logger.log(
      `Récupération messages pour projet ${id} par utilisateur ${req.user.id}`,
    );
    try {
      const messages = await this.projectMessagesService.findAllByProject(id);
      this.logger.log(
        `Retour de ${messages.length} messages pour projet ${id}`,
      );
      return messages;
    } catch (error) {
      this.logger.error(
        `Erreur lors de la récupération des messages pour projet ${id} : ${error.message}`,
      );
      throw error;
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const messageId = Number(id);
    if (isNaN(messageId)) {
      this.logger.error(`ID message invalide : ${id}`);
      throw new BadRequestException('ID message invalide');
    }
    return this.projectMessagesService.findOne(messageId);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProjectMessageDto: UpdateProjectMessageDto,
    @Request() req,
  ) {
    const messageId = Number(id);
    if (isNaN(messageId)) {
      this.logger.error(`ID message invalide : ${id}`);
      throw new BadRequestException('ID message invalide');
    }
    const userId = req.user.id;
    this.logger.log(
      `Mise à jour message ${messageId} par utilisateur ${userId}`,
    );
    return this.projectMessagesService.update(
      messageId,
      updateProjectMessageDto,
      userId,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req) {
    const messageId = Number(id);
    if (isNaN(messageId)) {
      this.logger.error(`ID message invalide : ${id}`);
      throw new BadRequestException('ID message invalide');
    }
    const userId = req.user.id;
    this.logger.log(
      `Suppression message ${messageId} par utilisateur ${userId}`,
    );
    return this.projectMessagesService.remove(messageId, userId);
  }
}
