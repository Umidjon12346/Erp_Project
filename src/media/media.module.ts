import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Media } from './entities/media.entity';
import { MediaResolver } from './media.resolver';

@Module({
  imports:[TypeOrmModule.forFeature([Media])],
  controllers: [MediaController,MediaResolver],
  providers: [MediaService],
})
export class MediaModule {}
