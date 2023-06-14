import { CreateClientInput } from './create-client.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';
import { Float, ID, Int } from '@nestjs/graphql/dist/scalars';
import { IsString, IsNumber, IsOptional, IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateClientInput extends PartialType(CreateClientInput) {
  @IsNotEmpty()
  @IsString()
  @Field((type) => Int)
  id: number;

  @IsOptional()
  @IsString()
  @Field((type) => String, { nullable: true })
  name?: string;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Field((type) => Float, { nullable: true })
  rate?: number;

  @IsOptional()
  @IsString()
  @Field((type) => String, { nullable: true })
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  @Field((type) => String, { nullable: true }) //Identifica que o campo pode ser nulo
  profileImage?: string;
}
