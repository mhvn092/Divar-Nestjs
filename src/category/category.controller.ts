import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/creatCategoryDto.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  root() {
    return this.categoryService.root();
  }

  @Get('/:name')
  brand(@Param() param){
   return this.categoryService.brand(param.name);
  }

  @Get('/:name/:name2')
  fetch(@Param() param,@Param() param2){
    return this.categoryService.getBrand(param.name,param2.name2);
  }
  
}
