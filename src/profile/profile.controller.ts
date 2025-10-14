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
  BadRequestException,
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

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/profile',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (req, file, callback) => {
        console.log('Received mimetype:', file.mimetype);
        console.log('Original filename:', file.originalname);

        // Vérifier le mimetype OU l'extension du fichier
        const allowedMimes = [
          'image/jpeg',
          'image/jpg',
          'image/png',
          'image/gif',
          'image/webp',
          'application/octet-stream',
        ];
        const allowedExts = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];

        const ext = extname(file.originalname).toLowerCase();
        const isValidMime = allowedMimes.includes(file.mimetype);
        const isValidExt = allowedExts.includes(ext);

        // Accepter si le mimetype est valide ET l'extension est une image
        if (file.mimetype === 'application/octet-stream' && isValidExt) {
          console.log('Accepting octet-stream with valid image extension');
          return callback(null, true);
        }

        if (!isValidMime || !isValidExt) {
          return callback(
            new BadRequestException(
              'Seules les images (JPG, PNG, GIF, WEBP) sont autorisées',
            ),
            false,
          );
        }

        callback(null, true);
      },
      limits: {
        fileSize: 5 * 1024 * 1024, // 5MB max
      },
    }),
  )
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Aucun fichier fourni');
    }

    console.log('Fichier uploadé:', file.filename);

    return {
      success: true,
      imageUrl: `https://oopsfarmback-b3823d9a75eb.herokuapp.com/uploads/profile/${file.filename}`,
      filename: file.filename,
    };
  }

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
