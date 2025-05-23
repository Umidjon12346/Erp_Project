import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateStudentDto {
  @Field()
  first_name: string;

  @Field()
  last_name: string;

  @Field()
  email: string;

  @Field()
  phone: string;

  @Field()
  password: string;

  @Field()
  confirm_password: string;

  @Field({ nullable: true })
  refresh_token: string;

  @Field({ defaultValue: true })
  is_active: boolean;

  @Field()
  gender: boolean;

  @Field()
  datebirth: string;

  @Field()
  avatarurl: string;
}
