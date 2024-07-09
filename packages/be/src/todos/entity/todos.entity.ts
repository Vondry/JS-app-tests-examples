import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import { Todo } from 'shared-code/models/Todo';

@Entity({ name: 'Todos' })
export class TodosEntity implements Todo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    description: string;

    @Column('boolean', { default: false })
    completed: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    // TODO: implement order attribute for customizing order of todos
}
