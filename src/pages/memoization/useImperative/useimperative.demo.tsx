// bir component içerisindeki state'i componentin dışarı açmış olduğu methodlar vasıtası ile güncelleme durumunda kullanılan bir yöntem
// <CounterLabel ref={cRef} />

import React, { useRef } from 'react';
import CounterLabelDemo, { CounterLabelHandle } from './counter.label.demo';

// cRef.current.increase();
// cRef.current.setInitialState();

// Label: 3 (+) 4

// Parent Component

function UseImperativeHandleDemo() {
	console.log('...parent rendering');
	const cref = useRef<CounterLabelHandle>(null);

	const onIncrease = () => {
		if (cref.current) {
			cref.current.increase();
		}
	};

	const onDecrease = () => {
		if (cref.current) {
			cref.current.decrease();
		}
	};

	const onReset = () => {
		if (cref.current) {
			cref.current.reset();
		}
	};

	return (
		<>
			<CounterLabelDemo count={1} ref={cref} />
			<button onClick={onIncrease}>(+)</button>
			<button onClick={onReset}>Reset</button>
			<button onClick={onDecrease}>(-)</button>
		</>
	);
}

export default UseImperativeHandleDemo;
