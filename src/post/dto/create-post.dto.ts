import { IsNumber, IsOptional, IsString } from "class-validator";
import { CategoryEntity } from "src/category/entities/category.entity";

export class CreatePostDto {
    @IsString()
    title:string;
    @IsNumber()
    price:number;
    @IsString()
    @IsOptional()
    img?:string;
}
