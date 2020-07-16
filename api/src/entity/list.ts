import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { Length } from "class-validator";

@Entity()
export class List {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: number;

    @Column({
        length: 500
    })
    @Length(1, 500)
    content: string

    @Column()
    status: number
}

export const listSchema = {
    id: { type: "number", required: true, example: 1 },
    user_id: { type: "number", required: true, example: 1 },
    content: { type: "string", required: true, example: "test" } ,
    status: { type: "number", required: true, example: 1 }
};