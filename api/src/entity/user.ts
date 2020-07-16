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
    user_name: string

    @Column({
        length: 128
    })
    @Length(6, 128)
    password: string
}

export const userSchema = {
    id: { type: "number", required: true, example: 1 },
    user_name: { type: "string", required: true, example: "kavii" },
    password: { type: "string", required: true, example: "123" }
};
