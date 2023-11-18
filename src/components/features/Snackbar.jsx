import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

const Snackbar = ({ message, duration, onClose }) => {
	useEffect(() => {
		const timer = setTimeout(() => {
			onClose();
		}, duration);

		return () => {
			clearTimeout(timer);
		};
	}, [duration, onClose]);

	return ReactDOM.createPortal(
		<div className='fixed w-[95%] z-50 bottom-5 left-1/2 -translate-x-1/2 p-3 bg-neutral-800 text-white rounded-md'>
			{message}
		</div>,
		document.body
	);
};

export default Snackbar;