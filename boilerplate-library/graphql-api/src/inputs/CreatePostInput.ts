import { InputType, Field } from 'type-graphql';
import { MinLength } from 'class-validator';

@InputType()
export class CreatePostInput {
  @Field()
  @MinLength(3)
  title!: string;

  @Field()
  @MinLength(10)
  content!: string;
}

