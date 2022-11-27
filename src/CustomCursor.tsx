import React from 'react';
import { useEffect, useRef } from 'react';

import './styles.css';

export default function CustomCursor() {
	const mainCursor = useRef<HTMLDivElement>();
	const secondaryCursor = useRef<HTMLDivElement>();

	const positionRef = useRef({
		mouseX: 0,
		mouseY: 0,
		destinationX: 0,
		destinationY: 0,
		distanceX: 0,
		distanceY: 0,
		key: null,
	});

	const setDestination = (x: number, y: number) => {
		positionRef.current.destinationX = x;
		positionRef.current.destinationY = y;
	};

	useEffect(() => {
		const onMouseMove = ({ clientX, clientY }: MouseEvent) => {
			positionRef.current.mouseX = clientX - secondaryCursor.current.clientWidth / 2;
			positionRef.current.mouseY = clientY - secondaryCursor.current.clientHeight / 2;

			mainCursor.current.style.opacity = '1';
			secondaryCursor.current.style.opacity = '1';

			mainCursor.current.style.transform =
				`translate3d(
					${clientX - mainCursor.current.clientWidth / 2}px,
					${clientY - mainCursor.current.clientHeight / 2}px,
					0
				)`;
		};

		document.addEventListener('mousemove', onMouseMove);

		return () => {
			document.removeEventListener('mousemove', onMouseMove);
		};
	}, []);

	useEffect(() => {
		const followMouse = () => {
			positionRef.current.key = requestAnimationFrame(followMouse);

			const {
				mouseX,
				mouseY,
				destinationX,
				destinationY,
				distanceX,
				distanceY,
			} = positionRef.current;

			secondaryCursor.current.style.transform =
				`translate3d(
					${destinationX}px,
					${destinationY}px,
					0
				)`;

			if (!destinationX || !destinationY) {
				setDestination(mouseX, mouseY);
			} else {
				positionRef.current.distanceX = (mouseX - destinationX) * 0.1;
				positionRef.current.distanceY = (mouseY - destinationY) * 0.1;

				const isMove =
					Math.abs(positionRef.current.distanceX)
					+ Math.abs(positionRef.current.distanceY)
					> 0.1;

				const
					newDestinationX = isMove
						? positionRef.current.destinationX + distanceX
						: mouseX,
					newDestinationY = isMove
						? positionRef.current.destinationY + distanceY
						: mouseY;

				setDestination(newDestinationX, newDestinationY);
			}
		};

		followMouse();
	}, []);

	return (
		<>
			<div className="main-cursor" ref={mainCursor}></div>
			<div className="secondary-cursor" ref={secondaryCursor}></div>
		</>
	);
}