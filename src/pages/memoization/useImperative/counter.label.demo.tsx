import React, {
	ForwardedRef,
	forwardRef,
	useImperativeHandle,
	useState,
} from 'react';

export type CounterLabelHandle = {
	reset: () => void;
	increase: () => void;
	decrease: () => void;
};

type Props = {
	count: number;
};

function CounterLabelDemo(
	{ count }: Props,
	forwadedRef: ForwardedRef<CounterLabelHandle>
) {
	console.log('...child rendering');
	const [counter, setCounter] = useState<number>(count);

	useImperativeHandle(forwadedRef, () => ({
		reset() {
			setCounter(0);
		},
		increase() {
			setCounter(counter + 1);
		},
		decrease() {
			setCounter(counter + 1);
		},
	}));

	return <>Sayac: {counter}</>;
}

export default forwardRef(CounterLabelDemo);
