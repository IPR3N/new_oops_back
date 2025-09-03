import { Module } from '@nestjs/common';
import { OopsBrouillonService } from './oops-brouillon.service';
import { OopsBrouillonController } from './oops-brouillon.controller';

@Module({
  controllers: [OopsBrouillonController],
  providers: [OopsBrouillonService],
})
export class OopsBrouillonModule {}
