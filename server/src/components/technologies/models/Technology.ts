import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Experience } from '../../experiences/models/Experience';
import { SkillLevel } from '../SkillLevel';
import { TechnologyType } from '../TechnologyType';

@Entity({ schema: 'portfolio', name: 'technologies' })
export class Technology {
	@PrimaryGeneratedColumn({ name: 'technology_id' })
	public technologyId!: number;

	@Column()
	public name!: string;

	@Column()
	public version!: string;

	@ManyToMany(type => Experience, experience => experience.experienceId)
	@JoinTable({ name: 'Experience_Experience__technologies' })
	public experiences!: Experience[];

	@ManyToOne(type => SkillLevel, skillLevel => skillLevel.skillLevelId)
	@JoinColumn({ name: 'skill_level_id' })
	public skillLevel!: SkillLevel;

	@ManyToOne(type => TechnologyType, technologyType => technologyType.technologyTypeId)
	@JoinColumn({ name: 'technology_type_id' })
	public technologyType!: TechnologyType;
}
