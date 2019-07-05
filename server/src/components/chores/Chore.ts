import { Column, Entity, OneToMany, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Assignment } from 'components';

@Entity({ schema: 'cs', name: 'chores' })
export class Chore {
	@PrimaryGeneratedColumn({ name: 'chore_id' })
	public choreId!: number;

	@Column()
	public name!: string;

	@OneToMany(type => Assignment, assignment => assignment.chore)
	public assignments!: Assignment[];

	@Column()
	public description!: string;

	@Column({ name: 'day_of_week_id' })
	public dayOfWeekId!: number;

	@Column({ name: 'date_deleted' })
	public dateDeleted?: Date;

	public constructor(chore?: Chore) {
		if (chore) {
			this.name = chore.name;
			this.description = chore.description;
			this.dayOfWeekId = chore.dayOfWeekId;
		}
	}
}
