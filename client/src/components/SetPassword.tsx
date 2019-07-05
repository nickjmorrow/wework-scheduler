import React, { useState } from 'react';
import { TextInput, Button, Typography, Fade } from '@nickjmorrow/react-component-library';
import { WEWORK_PASSWORD } from '../constants';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const SetPassword: React.FC = () => {
	const [password, setPassword] = useState('');
	const [isVisible, setIsVisible] = useState(false);
	const notify = () => toast('Password saved to localStorage. Refresh to view changes.');

	const handleClick = () => {
		if (!isVisible) {
			setIsVisible(true);
			return;
		}
		if (password === '') {
			setIsVisible(false);
			return;
		}
		localStorage.setItem(WEWORK_PASSWORD, password);
		setPassword('');
		notify();
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
				style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}
			>
				<TextInput value={password} onChange={e => setPassword(e.currentTarget.value)} />
				<Typography style={{ margin: '48px 0' }}>Updates will only persist with the right password.</Typography>
			</Fade>
			<Button style={{ margin: '0 auto' }} styleVariant={2} useMargin={false} onClick={handleClick}>
				Save Password
			</Button>
		</div>
	);
};
