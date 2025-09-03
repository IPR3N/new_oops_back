import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { OopsService } from './oops.service';
import { CreateOopDto } from './dto/create-oop.dto';
import { UpdateOopDto } from './dto/update-oop.dto';
import { diskStorage, memoryStorage } from 'multer';
import { extname } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import { CurrentUser } from 'src/decorator/current-user.decorator';
import { User } from 'src/user/entities/user.entity';
import * as https from 'https';
import * as fs from 'fs';

@Controller('oops')
export class OopsController {
  constructor(private readonly oopsService: OopsService) {}

  // private GITHUB_TOKEN = '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';
  // private REPO_NAME = 'IPR3N/images';
  // private USERNAME = 'IPR3N';
  // private BRANCH = 'main';

  // @Post('upload')
  // @UseInterceptors(
  //   FileInterceptor('image', {
  //     storage: memoryStorage(),
  //   }),
  // )
  // async uploadImage(@UploadedFile() file: Express.Multer.File) {
  //   if (!file) {
  //     throw new Error('Erreur lors du téléchargement de l’image');
  //   }

  //   // Convertir l'image en base64
  //   const base64Image = file.buffer.toString('base64');
  //   const imageName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extname(file.originalname)}`;
  //   const githubFilePath = `images/${imageName}`;

  //   const postData = JSON.stringify({
  //     message: `Upload de ${imageName}`,
  //     content: base64Image,
  //     branch: this.BRANCH,
  //   });

  //   const options = {
  //     hostname: 'api.github.com',
  //     method: 'PUT',
  //     headers: {
  //       Authorization: `token ${this.GITHUB_TOKEN}`,
  //       'User-Agent': 'Node.js',
  //       Accept: 'application/vnd.github.v3+json',
  //       'Content-Type': 'application/json',
  //       'Content-Length': Buffer.byteLength(postData),
  //     },
  //   };

  //   return new Promise((resolve, reject) => {
  //     const req = https.request(options, (res) => {
  //       let data = '';

  //       res.on('data', (chunk) => {
  //         data += chunk;
  //       });

  //       res.on('end', () => {
  //         try {
  //           const response = JSON.parse(data);
  //           if (response.content && response.content.download_url) {
  //             resolve({ imageUrl: response.content.download_url });
  //           } else {
  //             reject('Erreur lors de l’upload sur GitHub');
  //           }
  //         } catch (error) {
  //           reject('Erreur lors du parsing de la réponse GitHub');
  //         }
  //       });
  //     });

  //     req.on('error', (error) => {
  //       reject(`Erreur HTTP: ${error.message}`);
  //     });

  //     req.write(postData);
  //     req.end();
  //   });
  // }

  // private REPO_NAME = 'IPR3N/images';
  // private USERNAME = 'IPR3N';
  // private BRANCH = 'main';

  // @Post('upload')
  // @UseInterceptors(
  //   FileInterceptor('image', {
  //     storage: memoryStorage(),
  //     fileFilter: (req, file, callback) => {
  //       const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
  //       if (!allowedTypes.includes(file.mimetype)) {
  //         return callback(
  //           new BadRequestException('Type de fichier non supporté'),
  //           false,
  //         );
  //       }
  //       callback(null, true);
  //     },
  //     limits: {
  //       fileSize: 5 * 1024 * 1024, // 5MB max
  //     },
  //   }),
  // )
  // async uploadImage(@UploadedFile() file: Express.Multer.File) {
  //   if (!file) {
  //     throw new BadRequestException('Aucun fichier fourni');
  //   }

  //   const base64Image = file.buffer.toString('base64');
  //   const imageName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extname(file.originalname)}`;
  //   const githubFilePath = `images/${imageName}`;

  //   const postData = JSON.stringify({
  //     message: `Upload de ${imageName}`,
  //     content: base64Image,
  //     branch: this.BRANCH,
  //   });

  //   const options = {
  //     hostname: 'api.github.com',
  //     path: `/repos/${this.USERNAME}/${this.REPO_NAME}/contents/${githubFilePath}`,
  //     method: 'PUT',
  //     headers: {
  //       Authorization: `token ${this.GITHUB_TOKEN}`,
  //       'User-Agent': this.USERNAME,
  //       Accept: 'application/vnd.github+json', // Version mise à jour de l'API
  //       'Content-Type': 'application/json',
  //       'Content-Length': Buffer.byteLength(postData),
  //     },
  //   };

  //   try {
  //     const response = await new Promise((resolve, reject) => {
  //       const req = https.request(options, (res) => {
  //         let data = '';

  //         res.on('data', (chunk) => {
  //           data += chunk;
  //         });

  //         res.on('end', () => {
  //           const responseData = JSON.parse(data);
  //           if (res.statusCode === 201 && responseData.content) {
  //             // URL publique pour accéder à l'image
  //             const imageUrl = `https://raw.githubusercontent.com/${this.USERNAME}/${this.REPO_NAME}/${this.BRANCH}/${githubFilePath}`;
  //             resolve({ imageUrl });
  //           } else {
  //             reject(
  //               new BadRequestException(
  //                 'Erreur lors de l’upload sur GitHub: ' + data,
  //               ),
  //             );
  //           }
  //         });
  //       });

  //       req.on('error', (error) => {
  //         reject(new BadRequestException(`Erreur HTTP: ${error.message}`));
  //       });

  //       req.write(postData);
  //       req.end();
  //     });

  //     return response;
  //   } catch (error) {
  //     throw error instanceof BadRequestException
  //       ? error
  //       : new BadRequestException('Erreur lors de l’upload de l’image');
  //   }
  // }

  @Post(':id/share')
  async shareOops(@Param('id') oopsId: number, @CurrentUser() user: User) {
    return this.oopsService.shareOops(oopsId, user);
  }

  @Post()
  create(@Body() createOopDto: CreateOopDto) {
    return this.oopsService.create(createOopDto);
  }

  @Get()
  findAll() {
    return this.oopsService.findAll();
  }

  @Get('user/:id')
  findAllByUser(@Param('id') userId: number) {
    return this.oopsService.findAllOopsByUser(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.oopsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOopDto: UpdateOopDto) {
    return this.oopsService.update(+id, updateOopDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.oopsService.remove(+id);
  }

  // @Post('upload')
  // @UseInterceptors(
  //   FileInterceptor('image', {
  //     storage: diskStorage({
  //       destination: './uploads/oops',
  //       filename: (req, file, callback) => {
  //         const uniqueSuffix =
  //           Date.now() + '-' + Math.round(Math.random() * 1e9);
  //         const ext = extname(file.originalname);
  //         callback(null, `${uniqueSuffix}${ext}`);
  //       },
  //     }),
  //   }),
  // )

  // @Post('upload')
  // @UseInterceptors(
  //   FileInterceptor('image', {
  //     storage: memoryStorage(),
  //   }),
  // )
  // async uploadImage(@UploadedFile() file: Express.Multer.File) {
  //   if (!file) {
  //     throw new Error('Erreur lors du téléchargement de l’image');
  //   }

  //   // Lire l'image et la convertir en Base64
  //   // const imageData = fs.readFileSync(file.path);
  //   // const base64Image = imageData.toString('base64');
  //   // const imageName = file.filename;
  //   // const githubFilePath = `images/${imageName}`;

  //   const base64Image = file.buffer.toString('base64');
  //   const imageName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extname(file.originalname)}`;
  //   const githubFilePath = `images/${imageName}`;

  //   const postData = JSON.stringify({
  //     message: `Upload de ${imageName}`,
  //     content: base64Image,
  //     branch: this.BRANCH,
  //   });

  //   const options = {
  //     hostname: 'api.github.com',
  //     path: `/repos/${this.USERNAME}/${this.REPO_NAME}/contents/${githubFilePath}`,
  //     method: 'PUT',
  //     headers: {
  //       Authorization: `token ${this.GITHUB_TOKEN}`,
  //       'User-Agent': 'Node.js',
  //       Accept: 'application/vnd.github.v3+json',
  //       'Content-Type': 'application/json',
  //       'Content-Length': Buffer.byteLength(postData),
  //     },
  //   };

  //   return new Promise((resolve, reject) => {
  //     const req = https.request(options, (res) => {
  //       let data = '';

  //       res.on('data', (chunk) => {
  //         data += chunk;
  //       });

  //       res.on('end', () => {
  //         try {
  //           const response = JSON.parse(data);
  //           if (response.content && response.content.download_url) {
  //             resolve({ imageUrl: response.content.download_url });
  //           } else {
  //             reject('Erreur lors de l’upload sur GitHub');
  //           }
  //         } catch (error) {
  //           reject('Erreur lors du parsing de la réponse GitHub');
  //         }
  //       });
  //     });

  //     req.on('error', (error) => {
  //       reject(`Erreur HTTP: ${error.message}`);
  //     });

  //     req.write(postData);
  //     req.end();
  //   });
  // }

  // // uploadImage(@UploadedFile() file: Express.Multer.File) {
  // //   if (!file) {
  // //     throw new Error('Erreur lors du téléchargement de l’image');
  // //   }
  // //   console.log(file.path);

  // //   return {
  // //     imageUrl: `https://ipren-backend-4ece0558c6a1.herokuapp.com/uploads/oops/${file.filename}`,
  // //     // imageUrl: `http://localhost:3000/uploads/oops/${file.filename}`,
  // //   };
  // // }
}
