import { Module } from '@nestjs/common';
import { SharedNotesService } from './shared-notes.service';
import { SharedNotesController } from './shared-notes.controller';

@Module({
  controllers: [SharedNotesController],
  providers: [SharedNotesService],
})
export class SharedNotesModule {}
