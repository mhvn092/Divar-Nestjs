import { IsOptional } from "class-validator";
import { CategoryEntity } from "src/category/entities/category.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('post')
export class PostEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    title:string;

    @Column()
    price:number;

    @Column({nullable:true})
    @IsOptional()
    img:string;

    @ManyToMany(()=>CategoryEntity,(cat)=>cat.posts)
    category : CategoryEntity [];
}
