import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Teacher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  role: string;

  @Column()
  hashed_password: string;

  @Column({nullable:true})
  hashed_refresh_token: string;

  @Column({ default: true })
  is_active: boolean;
}
