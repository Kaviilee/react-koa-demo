import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { Length } from "class-validator";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 80
    })
    @Length(3, 80)
    userName: string

    @Column({
        length: 128
    })
    @Length(6, 128)
    password: string

    @Column()
    token?: string
}

export const userSchema = {
    id: { type: "number", required: true, example: 1 },
    userName: { type: "string", required: true, example: "kavii" },
    password: { type: "string", required: true, example: "123" }
};
