import { Button, Fade, TextInput, Typography, useThemeContext } from '@nickjmorrow/react-component-library';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NAME, WEWORK_PASSWORD } from '../constants';

export const SetPassword: React.FC = () => {
	const { spacing } = useThemeContext();
	const [password, setPassword] = useState(localStorage.getItem(WEWORK_PASSWORD) || '');
	const [name, setName] = useState(localStorage.getItem(NAME) || '');
	const [isVisible, setIsVisible] = useState(false);
	const notify = () => toast('Password saved to localStorage. Refresh to view changes.');

	const handleClick = () => {
		if (!isVisible) {
			setIsVisible(true);
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

		setIsVisible(false);
	};
	const handleCancel = () => {
		setIsVisible(false);
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
				transitionVariant={'medium'}
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
			<div style={{ display: 'grid', gridAutoFlow: 'row', gridRowGap: spacing.ss6 }}>
				<Button style={{ margin: '0 auto' }} styleVariant={2} useMargin={false} onClick={handleClick}>
					{isVisible ? 'Save Settings' : 'Update Settings'}
				</Button>

				<Fade in={isVisible} appear={true} transitionVariant={'fast'} style={{ margin: '0 auto' }}>
					<Button styleVariant={3} colorVariant={'warning'} useMargin={false} onClick={handleCancel}>
						Cancel
					</Button>
				</Fade>
			</div>
		</div>
	);
};
