import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Model of base fields', isAbstract: true })
export class BaseModel {
  @Field(() => ID, { description: 'Model identificator' })
  id: string;

  @Field(() => Date, { description: 'Date the model was created' })
  createdAt: Date;

  @Field(() => Date, { description: 'Date of last update of the model' })
  updatedAt: Date;
}
