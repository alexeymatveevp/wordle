import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from "./user.entity";

@Entity('guess')
export class Guess extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    guess: string;

    @ManyToOne(() => User, (user) => user.name)
    user: User;
}
