import { Roles } from './roles/roles.enum';
import { Task } from 'src/tasks/task.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  role: Roles;

  @OneToMany((_type) => Task, (task) => task.user, { eager: true })
  tasks: Task[]; // kjo duhet ber vehicles
}
