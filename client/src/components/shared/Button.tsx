import * as React from 'react';
import { Button as GenericButton, useThemeContext, GetComponentProps } from '@nickjmorrow/react-component-library';

export const Button: React.FC<{leftColor: string; rightColor: string} & GetComponentProps<typeof GenericButton>> = ({ children, leftColor, rightColor, ...props }) => {
	const {colors} = useThemeContext();
	return (
		<GenericButton
			colorVariant={'primaryLight'}
			styleVariant={2}
			useMargin={false}
			style={{backgroundColor: 'hsla(0, 0%, 0%, 10%)', border: '3.5px solid white'}}
			typographyStyle={{ textTransform: 'none', fontSize: '18px', background: `-webkit-linear-gradient(0deg, ${leftColor || colors.core.cs5}, ${rightColor || colors.accent.cs5})`, backgroundClip: 'text', '-webkit-background-clip': 'text', '-webkit-text-fill-color': 'transparent' }}
			{...props}
		>
			{children}
		</GenericButton>
	);
};
