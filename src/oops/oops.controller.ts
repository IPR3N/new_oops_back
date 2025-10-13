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

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/oops',
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
      // fileFilter: (req, file, callback) => {
      //   console.log('Received mimetype:', file.mimetype);
      //   console.log('Original filename:', file.originalname);
      //   // Vérifier le type de fichier complet
      //   if (!file.mimetype.match(/^image\/(jpg|jpeg|png|gif|webp)$/)) {
      //     return callback(
      //       new BadRequestException('Seules les images sont autorisées'),
      //       false,
      //     );
      //   }
      //   callback(null, true);
      // },
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
      // imageUrl: `https://localhost:3000/uploads/oops/${file.filename}`,

      imageUrl: `https://oopsfarmback-b3823d9a75eb.herokuapp.com/uploads/oops/${file.filename}`,
      filename: file.filename,
    };
  }

  @Post()
  create(@Body() createOopDto: CreateOopDto) {
    return this.oopsService.create(createOopDto);
  }

  @Post(':id/share')
  async shareOops(@Param('id') oopsId: number, @CurrentUser() user: User) {
    return this.oopsService.shareOops(oopsId, user);
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
}
