import { ObjectType } from "@nestjs/graphql";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";
import { Field } from "@nestjs/graphql/dist/decorators";
import { Float, ID, Int } from "@nestjs/graphql/dist/scalars";

@Entity('clients')
@ObjectType()
export class Client {
    @PrimaryGeneratedColumn()
    @Field(type => Int)
    id: number;

    @Column()
    @Field(type => String)
    name: string;

    @Column({ nullable: true })
    @Field(type => Float, { nullable: true })
    rate?: number;

    @Column()
    @Field(type => String) //o graphql entende que é string, mas colocamos para deixar claro
    phoneNumber: string;

    @Column({ nullable: true })
    @Field(type => String, { nullable: true }) //Identifica que o campo pode ser nulo
    profileImage?: string;

    @CreateDateColumn()
    @Field(type => Date, { nullable: true }) //Identifica que o campo pode ser nulo
    createdAt: Date;

    @UpdateDateColumn()
    @Field(type => Date, { nullable: true }) //Identifica que o campo pode ser nulo
    updatedAt: Date;
}