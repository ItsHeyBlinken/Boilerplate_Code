import { InputType, Field } from 'type-graphql';
import { IsOptional, MinLength } from 'class-validator';

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  @IsOptional()
  @MinLength(2)
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @MinLength(8)
  password?: string;
}

