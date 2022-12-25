import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from "./user.entity";

@Entity('game')
export class Game extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.name)
    user: User;

    @Column()
    win: boolean;

    @Column()
    winWord: number;

    @CreateDateColumn()
    createdDate: Date;
}
