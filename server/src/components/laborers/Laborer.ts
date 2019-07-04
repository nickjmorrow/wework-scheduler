import { Column, Entity, OneToMany, PrimaryGeneratedColumn, ManyToMany, JoinTable, ManyToOne } from 'typeorm';
import { Assignment } from '../assignments';

@Entity({ schema: 'cs', name: 'laborers' })
export class Laborer {
	@PrimaryGeneratedColumn({ name: 'laborer_id' })
	public laborerId!: number;

	@Column()
	public name!: string;

	@Column()
	public email!: string;

	@Column({ name: 'date_deleted' })
	public dateDeleted!: Date;

	// @OneToMany(type => Assignment, assignment => assignment.laborer)
	// public assignments!: Assignment[];
}
