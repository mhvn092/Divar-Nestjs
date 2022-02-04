import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './entities/post.entity';
import { CategoryEntity } from 'src/category/entities/category.entity';

@Module({
  imports:[TypeOrmModule.forFeature([PostEntity,CategoryEntity])],
  providers: [PostService],
  exports:[PostService],
})
export class PostModule {}
