import { Module } from '@nestjs/common';
import { OopsShareService } from './oops-share.service';
import { OopsShareController } from './oops-share.controller';

@Module({
  controllers: [OopsShareController],
  providers: [OopsShareService],
})
export class OopsShareModule {}
