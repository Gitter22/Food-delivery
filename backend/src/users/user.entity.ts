import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, CreateDateColumn } from "typeorm";
import * as bcrypt from 'bcrypt'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    address: string;

    @Column({ default: false })
    isAdmin: boolean

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP()" })
    createdAt: Date;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 12);
    }
}