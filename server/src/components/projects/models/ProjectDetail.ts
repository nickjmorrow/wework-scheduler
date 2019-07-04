import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Project } from './Project';

@Entity({ schema: 'portfolio', name: 'project_details' })
export class ProjectDetail {
	@PrimaryGeneratedColumn({ name: 'project_detail_id' })
	public projectDetailId!: number;

	@ManyToOne(type => Project, project => project.projectDetails)
	@JoinColumn({ name: 'project_id' })
	public Project!: Project;

	@Column()
	public description!: string;
}
