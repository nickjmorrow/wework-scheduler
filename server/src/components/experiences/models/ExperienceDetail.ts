import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Experience } from './Experience';

@Entity({ schema: 'portfolio', name: 'experience_details' })
export class ExperienceDetail {
	@PrimaryGeneratedColumn({ name: 'experience_detail_id' })
	public experienceDetailId!: number;

	@ManyToOne(type => Experience, experience => experience.experienceDetails)
	@JoinColumn({ name: 'experience_id' })
	public Experience!: Experience;

	@Column()
	public description!: string;
}
