import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/category/entities/category.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { PostEntity } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
  ){}


  create(createPostDto: CreatePostDto) {
    this.postRepository.create(createPostDto);
    return this.postRepository.save(createPostDto);
  }


  findOne(id: number) {
    return this.postRepository.findOne(id);
  }

  async addCategory(id:number ,cat : CategoryEntity){
    let post = await this.findOne(id);
    if (post.category != undefined) {
      post.category.push(cat);
    } else {
      post.category = [cat];
    }
    return this.postRepository.save(post);
  }

}
