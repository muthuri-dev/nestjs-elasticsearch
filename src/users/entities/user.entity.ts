import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  email: string;

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @UpdateDateColumn()
  updated_at: Date;
}
