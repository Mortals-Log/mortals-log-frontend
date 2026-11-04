'use client';

import { resolveValue, ToastBar, Toaster } from 'react-hot-toast';
import { TOASTER_CONTAINER_STYLE, TOASTER_OPTIONS } from '@/const/toast';

/** 마침표·느낌표·물음표 뒤에서 줄을 바꿔, 문장 하나가 한 줄로 보이게 한다. */
const breakSentences = (text: string) => text.replace(/([.!?])\s+/g, '$1\n');

const MESSAGE_STYLE = {
	display: 'flex',
	flex: '1 1 auto',
	margin: '0.25rem 0.5rem',
	color: 'inherit',
	textAlign: 'left',
	whiteSpace: 'pre-line',
} as const;

const AppToaster = () => (
	<Toaster
		position="bottom-center"
		reverseOrder={false}
		containerStyle={TOASTER_CONTAINER_STYLE}
		toastOptions={TOASTER_OPTIONS}>
		{toast => (
			<ToastBar toast={toast}>
				{({ icon }) => {
					const message = resolveValue(toast.message, toast);
					return (
						<>
							{icon}
							<div {...toast.ariaProps} style={MESSAGE_STYLE}>
								{typeof message === 'string' ? breakSentences(message) : message}
							</div>
						</>
					);
				}}
			</ToastBar>
		)}
	</Toaster>
);

export default AppToaster;
