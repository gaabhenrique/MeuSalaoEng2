import { InputType } from "@nestjs/graphql";
import { Field } from "@nestjs/graphql/dist/decorators";
import { Float, ID, Int } from "@nestjs/graphql/dist/scalars";
import { IsString, IsNumber, IsNotEmpty, IsOptional } from "class-validator";

@InputType()
export class CreateClientInput {
    @IsNotEmpty()
    @IsString()
    @Field(type => String)
    name: string;

    @IsOptional()
    @IsNumber({ maxDecimalPlaces: 2 })
    @Field(type => Float, { nullable: true })
    rate?: number;

    @IsNotEmpty()
    @IsString()
    @Field(type => String)
    phoneNumber: string;

    @IsOptional()
    @IsString()
    @Field(type => String, { nullable: true }) //Identifica que o campo pode ser nulo
    profileImage?: string;
}