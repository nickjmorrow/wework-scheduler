import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Technology } from './models/Technology';

@Entity({ schema: 'portfolio', name: 'skill_levels' })
export class SkillLevel {
	@PrimaryGeneratedColumn({ name: 'skill_level_id' })
	public skillLevelId!: number;

	@OneToMany(type => Technology, technology => technology.skillLevel)
	public Technology!: Technology;

	@Column()
	public description!: string;
}
