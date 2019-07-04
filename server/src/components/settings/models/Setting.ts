import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ schema: 'portfolio', name: 'settings' })
export class Setting {
	@PrimaryColumn({ name: 'setting_id' })
	public settingId!: string;

	@Column({ name: 'value' })
	public value!: string;
}
