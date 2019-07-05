import { Column, Entity, OneToMany, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToOne, ManyToOne, JoinColumn } from 'typeorm';
import { Laborer } from '../laborers';
import { Chore } from '../chores';

@Entity({ schema: 'cs', name: 'assignments' })
export class Assignment {
	@PrimaryGeneratedColumn({ name: 'assignment_id' })
	public assignmentId!: number;

	@ManyToOne(type => Laborer, laborer => laborer.assignments)
	@JoinColumn({ name: 'laborer_id' })
	public laborer!: Laborer;

	@ManyToOne(type => Chore, chore => chore.assignments)
	@JoinColumn({name: 'chore_id'})
	public chore!: Chore;

	@Column({ name: 'assignment_date' })
	public assignmentDate!: Date;
}
