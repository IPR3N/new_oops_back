// import {
//   Controller,
//   Get,
//   Post,
//   Body,
//   Patch,
//   Param,
//   Delete,
//   UseInterceptors,
//   UploadedFile,
//   Put,
// } from '@nestjs/common';
// import { ProfileService } from './profile.service';
// import { CreateProfileDto } from './dto/create-profile.dto';
// import { UpdateProfileDto } from './dto/update-profile.dto';
// import { FileInterceptor } from '@nestjs/platform-express';
// import { diskStorage } from 'multer';
// import { extname } from 'path';

// @Controller('profile')
// export class ProfileController {
//   constructor(private readonly profileService: ProfileService) {}

//   @Post('upload/')
//   @UseInterceptors(
//     FileInterceptor('image', {
//       storage: diskStorage({
//         destination: './uploads/profile',
//         filename: (req, file, callback) => {
//           const uniqueSuffix =
//             Date.now() + '-' + Math.round(Math.random() * 1e9);
//           const ext = extname(file.originalname);
//           callback(null, `${uniqueSuffix}${ext}`);
//         },
//       }),
//     }),
//   )
//   uploadImage(@UploadedFile() file: Express.Multer.File) {
//     if (!file) {
//       throw new Error('Erreur lors du téléchargement de l’image');
//     }
//     console.log(file.path);

//     return {
//       imageUrl: `https://ipren-backend-4ece0558c6a1.herokuapp.com/uploads/profile/${file.filename}`,
//       // imageUrl: `http://10.0.2.2:3000/uploads/profile/${file.filename}`,
//     };
//   }

//   @Post()
//   create(@Body() createProfileDto: CreateProfileDto) {
//     return this.profileService.create(createProfileDto);
//   }

//   @Get()
//   findAll() {
//     return this.profileService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.profileService.findOne(+id);
//   }

//   @Put(':id')
//   update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
//     return this.profileService.update(+id, updateProfileDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.profileService.remove(+id);
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
  UseInterceptors,
  UploadedFile,
  Put,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage, memoryStorage } from 'multer';
import { extname } from 'path';
import * as fs from 'fs';
import * as https from 'https';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  // private GITHUB_TOKEN = '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';
  // private REPO_NAME = 'IPR3N/images';
  // private USERNAME = 'IPR3N';
  // private BRANCH = 'main';

  @Post('upload/')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: memoryStorage(),
      // storage: diskStorage({
      //   destination: './uploads/profile',
      //   filename: (req, file, callback) => {
      //     const uniqueSuffix =
      //       Date.now() + '-' + Math.round(Math.random() * 1e9);
      //     const ext = extname(file.originalname);
      //     callback(null, `${uniqueSuffix}${ext}`);
      //   },
      // }),
    }),
  )
  // async uploadImage(@UploadedFile() file: Express.Multer.File) {
  //   if (!file) {
  //     throw new Error('Erreur lors du téléchargement de l’image');
  //   }

  //   // Lire l'image et la convertir en Base64
  //   const imageData = fs.readFileSync(file.path);
  //   const base64Image = imageData.toString('base64');
  //   const imageName = file.filename;
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
  @Post()
  create(@Body() createProfileDto: CreateProfileDto) {
    return this.profileService.create(createProfileDto);
  }

  @Get()
  findAll() {
    return this.profileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profileService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.update(+id, updateProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profileService.remove(+id);
  }
}
