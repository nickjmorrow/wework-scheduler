import * as React from 'react';
import { EnterPassword } from './EnterPassword';
import { WEWORK_PASSWORD } from '../constants';

export const AlertEnterPassword: React.FC = () => {
	return localStorage.getItem(WEWORK_PASSWORD) ? null : <EnterPassword />;
};
