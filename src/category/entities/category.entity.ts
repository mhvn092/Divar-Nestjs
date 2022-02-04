import { PostEntity } from "src/post/entities/post.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('category')
export class CategoryEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    title:string;

    @ManyToMany(()=>PostEntity,(post)=>post.category)
    @JoinTable({})
    posts : PostEntity [];
}
