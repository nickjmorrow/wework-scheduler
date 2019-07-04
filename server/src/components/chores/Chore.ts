import { Column, Entity, OneToMany, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';

@Entity({ schema: 'cs', name: 'chores' })
export class Chore {
	@PrimaryGeneratedColumn({ name: 'chore_id' })
	public choreId!: number;

	@Column()
	public name!: string;

	@Column()
	public description!: string;

	@Column({name: 'day_of_week_id'})
	public dayOfWeekId!: number;

	@Column({ name: 'date_deleted' })
	public dateDeleted!: Date;
}
