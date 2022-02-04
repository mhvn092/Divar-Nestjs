import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from 'src/post/entities/post.entity';
import { CategoryEntity } from './entities/category.entity';
import { PostModule } from 'src/post/post.module';
import { CatlessController } from './catless.controller';
import { HttpModule } from 'nestjs-http-promise';



@Module({
  imports:[TypeOrmModule.forFeature([PostEntity,CategoryEntity]),
  PostModule,HttpModule.registerAsync({
    useFactory: () => ({
    timeout: 5000,
    baseURL:'https://api.divar.ir/v8/web-search/mashhad',
    }),
})],
  controllers: [CategoryController,CatlessController],
  providers: [CategoryService]
})
export class CategoryModule {}
