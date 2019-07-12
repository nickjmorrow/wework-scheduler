import { Button, Fade, TextInput, Typography } from '@nickjmorrow/react-component-library';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { WEWORK_PASSWORD, NAME } from '../constants';

export const SetPassword: React.FC = () => {
	const [password, setPassword] = useState(localStorage.getItem(WEWORK_PASSWORD) || '');
	const [name, setName] = useState(localStorage.getItem(NAME) || '');
	const [isVisible, setIsVisible] = useState(false);
	const notify = () => toast('Password saved to localStorage. Refresh to view changes.');

	const handleClick = () => {
		if (password === '' && name === '') {
			setIsVisible(false);
			return;
		}
		if (password !== '') {
			localStorage.setItem(WEWORK_PASSWORD, password);
		}

		if (name !== '') {
			localStorage.setItem(NAME, name);
		}

		if (isVisible) {
			notify();
		}

		setIsVisible(state => !state);
	};
	return (
		<div style={{ width: 'max-content', margin: '256px auto' }}>
			<Fade
				in={isVisible}
				mountOnEnter={true}
				unmountOnExit={true}
				styleKeys={['height']}
				mounted={{ height: '130px', marginBottom: '32px' }}
				unmounted={{ height: '0px' }}
				style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}
			>
				<div style={{ display: 'grid', gridAutoFlow: 'row', gridRowGap: '16px' }}>
					<TextInput placeholder={'Name'} value={name} onChange={e => setName(e.currentTarget.value)} />
					<TextInput
						placeholder={'Password'}
						value={password}
						onChange={e => setPassword(e.currentTarget.value)}
					/>
				</div>
				<Typography style={{ margin: '48px 0' }}>Updates will only persist with the right password.</Typography>
			</Fade>
			<Button style={{ margin: '0 auto' }} styleVariant={2} useMargin={false} onClick={handleClick}>
				{isVisible ? 'Save Settings' : 'Update Settings'}
			</Button>
		</div>
	);
};
