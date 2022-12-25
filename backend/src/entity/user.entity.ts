import { BaseEntity, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User extends BaseEntity {
    @PrimaryColumn()
    name: string;

    @Column()
    password: string;
}
