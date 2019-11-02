import React, { useState } from 'react';
import { TextInput, Typography, Button, Fade, useThemeContext, Link } from '@nickjmorrow/react-component-library';
import { toast } from 'react-toastify';
import { WEWORK_PASSWORD, NAME } from '../constants';

export const EnterPassword: React.FC = () => {
	const [password, setPassword] = useState(localStorage.getItem(WEWORK_PASSWORD) || '');
	const [name, setName] = useState('');
	const theme = useThemeContext();
	const notify = () => {
		toast('Password saved to localStorage. The page will now refresh for the changes to take effect.');

		setTimeout(() => {
			location.reload();
		}, 3000);
	};

	const handleClick = () => {
		if (password === '') {
			return;
		}

		localStorage.setItem(WEWORK_PASSWORD, password);

		if (name !== '') {
			localStorage.setItem(NAME, name);
		}

		notify();
	};

	return (
		<div style={{ minHeight: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
			<div style={{ display: 'grid', gridAutoFlow: 'row', gridRowGap: '32px' }}>
				<div
					style={{
						backgroundColor: theme.colors.warning.cs1,
						padding: '32px',
						borderRadius: theme.border.borderRadius.br1,
					}}
				>
					<Typography style={{ display: 'block' }}>
						You have not yet entered a password. A password is required for changes to persist.
					</Typography>
					<Typography style={{ display: 'block' }}>
						Please see <Link route="http://go/nycWeworkPassword">go/nycWeworkPassword</Link> and enter the
						password.
					</Typography>
				</div>
				<TextInput placeholder={'Name'} value={name} onChange={e => setName(e.currentTarget.value)} />
				<TextInput
					placeholder={'Password'}
					value={password}
					onChange={e => setPassword(e.currentTarget.value)}
				/>
				<Button styleVariant={2} useMargin={false} onClick={handleClick} style={{ backgroundColor: 'white' }}>
					{'Update Settings'}
				</Button>
			</div>
		</div>
	);
};
