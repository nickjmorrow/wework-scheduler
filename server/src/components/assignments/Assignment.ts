import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Chore } from '../chores';
import { Laborer } from '../laborers';

@Entity({ schema: 'cs', name: 'assignments' })
export class Assignment {
	@PrimaryGeneratedColumn({ name: 'assignment_id' })
	public assignmentId!: number;

	@ManyToOne(type => Laborer, laborer => laborer.assignments)
	@JoinColumn({ name: 'laborer_id' })
	public laborer!: Laborer;

	@ManyToOne(type => Chore, chore => chore.assignments)
	@JoinColumn({ name: 'chore_id' })
	public chore!: Chore;

	@Column({ name: 'assignment_date' })
	public assignmentDate!: Date;

	@Column({ name: 'is_email_sent' })
	public isEmailSent!: boolean;

	public constructor(assignmentInput?: AssignmentInput) {
		if (assignmentInput) {
			const { laborer, chore, assignmentDate } = assignmentInput;
			this.laborer = laborer;
			this.chore = chore;
			this.assignmentDate = new Date(assignmentDate);
		}
	}
}

interface AssignmentInput {
	laborer: Laborer;
	chore: Chore;
	assignmentDate: Date;
}
