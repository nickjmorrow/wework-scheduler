import { Column, Entity, OneToMany, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { ExperienceDetail } from './ExperienceDetail';
import { Technology } from '../../technologies/models/Technology';

@Entity({ schema: 'portfolio', name: 'experiences' })
export class Experience {
	@PrimaryGeneratedColumn({ name: 'experience_id' })
	public experienceId!: number;

	@Column()
	public name!: string;

	@Column({ name: 'start_date' })
	public startDate!: Date;

	@Column({ name: 'end_date' })
	public endDate!: Date;

	@Column({ name: 'is_current' })
	public isCurrent!: boolean;

	@Column({ name: 'role_name' })
	public roleName!: string;

	@Column()
	public location!: string;

	@OneToMany(type => ExperienceDetail, experienceDetail => experienceDetail.Experience)
	public experienceDetails!: ExperienceDetail[];

	@ManyToMany(type => Technology, technology => technology.technologyId)
	@JoinTable({ name: 'Experience_Experience__technologies' })
	public technologies!: Technology[];
}
