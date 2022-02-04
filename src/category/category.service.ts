import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostService } from 'src/post/post.service';
import { Repository } from 'typeorm';
import { CategoryEntity } from './entities/category.entity';
import { HttpService } from 'nestjs-http-promise';
import { CreateCategoryDto } from './dto/creatCategoryDto.dto';


@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
    private readonly postService: PostService,
    private readonly httpService: HttpService) { }


  async root(): Promise<object> {
    let a = await this.httpService.get('/');
    let b = a.data.schema.ui_schema.category.urischema.display
    return b;
  }

  async brand(name: string) {
    try {
      let a = await this.httpService.get(`/${name}`);
      let b = a.data.input_suggestion.json_schema.properties.brand_model.properties.value.items.enum;
      return b;
    }
    catch (e) { throw new BadRequestException('This Category has no brands,please use the catless controller') }
  }

  p2e = s => s.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d));

  price(a):number{
    a = a.split('\n')
    a[1]=a[1].replace('تومان','')
    a[1]=a[1].replace(/,/g,'')
    a[0]=a[0].replace('کیلومتر','KM')
    return this.p2e(a[1]);
  }
  create(createCategoryDto:CreateCategoryDto) {
    const a = this.categoryRepository.create(createCategoryDto);
    return this.categoryRepository.save(a);
    }

  async query(title: string) {
    return await this.categoryRepository.findOne({ title });
  }

  async getBrand(name1: string, name2: string) {
    try {
      let a = await this.httpService.get(`/${name1}/${name2}`);
      let cat ;
      if (await this.query(name2)){
        cat = await this.query(name2);
      }else{
      cat = await this.create({title:name2}); }
      console.log(cat);
      a.data.widget_list.forEach(async (item: { 
        data: { title: string,image:string,description:string }; }) => {
         if(item.data.description.includes('تومان')){
        let c = await this.postService.create({title:item.data.title,
        img:item.data.image,
        price:this.price(item.data.description)});
        await this.postService.addCategory(c.id,cat);
      }else{
        return
      } });
        return 'All the Ads in this category added to database baby';
    }
    catch (e) { throw new BadRequestException('No such product') };
  }

  async nobrand(name: string) {
    try {
      let a = await this.httpService.get(`/${name}`);
      let cat ;
      if (await this.query(name)){
        cat = await this.query(name);
      }else{
      cat = await this.create({title:name}); }
      console.log(cat);
      a.data.widget_list.forEach(async (item: { 
        data: { title: string,image:string,description:string }; }) => {
         if(item.data.description.includes('تومان')){
        let c = await this.postService.create({title:item.data.title,
        img:item.data.image,
        price:this.price(item.data.description)});
        await this.postService.addCategory(c.id,cat);
      }else{
        return
      } });
        return 'All the Ads in this category added to database baby';
    }
    catch (e) { throw new BadRequestException('no such category man') }
  }

  findAll() {
    return this.categoryRepository.find();
  }

  findOne(id: number) {
    return this.categoryRepository.findOne(id);
  }


  remove(id: number) {
    return this.categoryRepository.delete(id)
  }
}