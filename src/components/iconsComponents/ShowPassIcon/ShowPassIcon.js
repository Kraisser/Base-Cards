import {useState, useEffect, useRef} from 'react';

export default function ShowPassIcon({id, width, height, animDuration, onClick}) {
	const [eyeOpen, setEyeOpen] = useState('close');
	const canvasRef = useRef(null);
	const cWidth = parseInt(width);
	const cHeight = parseInt(height);
	const op = {
		topMax: 5,
		topMin: 12,
		bottomMax: 25,
		bottomMin: 18,
		arcMax: 3.8,
		arcMin: 1.5,
	};
	const animStep = animDuration / 16;
	const eyeStep = (op.topMin - op.topMax) / animStep;
	const arcStep = (op.arcMax - op.arcMin) / animStep;

	useEffect(() => {
		drawEye(op.topMin, op.bottomMin, op.arcMin);
	}, []);

	useEffect(() => {
		if (eyeOpen === 'close' || eyeOpen === 'open') {
			return;
		}
		onClick();
		const {top, bottom, arc} =
			eyeOpen === 'closing'
				? {
						top: op.topMax,
						bottom: op.bottomMax,
						arc: op.arcMax,
				  }
				: {
						top: op.topMin,
						bottom: op.bottomMin,
						arc: op.arcMin,
				  };

		setTimeout(() => {
			stepEye(top, bottom, arc, animStep);
		}, 16);
	}, [eyeOpen]);

	const drawEye = (topVal, bottomVal, arcVal) => {
		const ctx = getCanvasCtx();

		clearCanvas();
		ctx.strokeStyle = '#ff9601';
		ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.moveTo(7, 15);
		ctx.quadraticCurveTo(15, topVal, 23, 15);
		ctx.quadraticCurveTo(15, bottomVal, 7, 15);
		ctx.closePath();
		ctx.stroke();
		ctx.beginPath();
		ctx.fillStyle = '#ff9601';
		ctx.lineWidth = 1;
		ctx.arc(15, 15, arcVal, 0, Math.PI * 2);
		ctx.fill();
		ctx.stroke();
	};

	const stepEye = (top, bottom, arc, animStepsLeft) => {
		if (animStepsLeft === 0) {
			if (eyeOpen === 'closing') {
				return setEyeOpen('close');
			} else {
				return setEyeOpen('open');
			}
		}

		const topVal = eyeOpen === 'opening' ? top - eyeStep : top + eyeStep;
		const bottomVal = eyeOpen === 'opening' ? bottom + eyeStep : bottom - eyeStep;
		const arcVal = eyeOpen === 'opening' ? arc + arcStep : arc - arcStep;

		drawEye(topVal, bottomVal, arcVal);

		setTimeout(() => {
			stepEye(topVal, bottomVal, arcVal, animStepsLeft - 1);
		}, 16);
	};

	const changeEye = () => {
		if (eyeOpen === 'opening' || eyeOpen === 'closing') {
			return;
		}
		if (eyeOpen === 'close') {
			setEyeOpen('opening');
		} else {
			setEyeOpen('closing');
		}
	};

	const getCanvasCtx = () => canvasRef.current.getContext('2d');
	const clearCanvas = () => getCanvasCtx().clearRect(0, 0, cWidth, cHeight);

	return (
		<canvas
			ref={canvasRef}
			style={{width, height}}
			width={cWidth}
			height={cHeight}
			className='eyeCanvas'
			id={id}
			onClick={changeEye}></canvas>
	);
}
