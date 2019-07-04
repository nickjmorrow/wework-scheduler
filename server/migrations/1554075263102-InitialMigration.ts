import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1554075263102 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<any> {
		const query = `
			CREATE SCHEMA portfolio;

			CREATE TABLE portfolio.settings (
				setting_id VARCHAR(255) NOT NULL PRIMARY KEY
				, value VARCHAR(255) NOT NULL
			);

			CREATE TABLE portfolio.skill_levels (
				skill_level_id INT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY
				, description VARCHAR(100) NOT NULL
			);

			INSERT INTO portfolio.skill_levels (description) (
				SELECT 'familiar' UNION
				SELECT 'proficient'
			);

			INSERT INTO portfolio.settings (setting_id, value)
			SELECT 'FULL_NAME', 'Nicholas Morrow';

			CREATE TABLE portfolio.projects (
				project_id INT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY
				, name VARCHAR(255) NOT NULL
			);

			INSERT INTO portfolio.projects (name)
			SELECT 'project one' UNION
			SELECT 'project two';

			CREATE TABLE portfolio.experiences (
				experience_id INT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY
				, name VARCHAR(255) NOT NULL
			);

			INSERT INTO portfolio.experiences (name)
			SELECT 'experience one' UNION
			SELECT 'experience two';

			CREATE TABLE portfolio.technologies (
				technology_id INT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY
				, name VARCHAR(255) NOT NULL
				, skill_level_id INT NOT NULL REFERENCES portfolio.skill_levels(skill_level_id)
			);

			INSERT INTO portfolio.technologies (name, skill_level_id)
			SELECT 'technology a', 1 UNION
			SELECT 'technology b', 2;

			CREATE TABLE portfolio.experience_details (
				experience_detail_id INT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY
				, experience_id INT NOT NULL REFERENCES portfolio.experiences(experience_id)
				, description VARCHAR(255) NOT NULL
			);

			INSERT INTO portfolio.experience_details (experience_id, description)
			SELECT 1, 'exp det one - 1' UNION
			SELECT 2, 'exp det one - 2' UNION
			SELECT 2, 'exp det two - 2';


			CREATE TABLE portfolio."Experience_Experience__technologies" (
				"experiencesExperienceId" INT NOT NULL REFERENCES portfolio.experiences(experience_id)
				, "technologiesTechnologyId" INT NOT NULL REFERENCES portfolio.technologies(technology_id)
			);

			INSERT INTO portfolio."Experience_Experience__technologies" ("experiencesExperienceId", "technologiesTechnologyId")
			SELECT 1, 2 UNION
			SELECT 2, 1 UNION
			SELECT 2, 2;

			CREATE TABLE portfolio."Project_Project__technologies" (
				"projectsProjectId" INT NOT NULL REFERENCES portfolio.projects(project_id)
				, "technologiesTechnologyId" INT NOT NULL REFERENCES portfolio.technologies(technology_id)
			);

			INSERT INTO portfolio."Project_Project__technologies" ("projectsProjectId", "technologiesTechnologyId")
			SELECT 1, 1 UNION
			SELECT 2, 2;

			CREATE TABLE portfolio.project_details (
				project_detail_id INT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY
				, project_id INT NOT NULL REFERENCES portfolio.projects(project_id)
				, description VARCHAR(255) NOT NULL
			);

			INSERT INTO portfolio.project_details (project_id, description)
			SELECT 1, 'description for project one'			UNION
			SELECT 1, 'another description for project one'	UNION
			SELECT 2, 'single description for project two';
        `;

		await queryRunner.query(query);
	}

	public async down(queryRunner: QueryRunner): Promise<any> {
		const query = `
			DROP TABLE portfolio.experience_details;

			DROP TABLE portfolio."Experience_Experience__technologies";

			DROP TABLE portfolio."Project_Project__technologies";

			DROP TABLE portfolio.project_details;

			DROP TABLE portfolio.projects;

			DROP TABLE portfolio.experiences;

			DROP TABLE portfolio.technologies;

			DROP TABLE portfolio.settings;

			DROP TABLE portfolio.skill_levels;

			DROP SCHEMA portfolio;
		`;

		await queryRunner.query(query);
	}
}
