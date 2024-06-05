// 1. Kullanım şekli State bağlı kalmaksızın bir değişkenin değerini memoize etmemizi sağlar
// 2. Html elementlerin domdaki referanslarına bağlanarak, tasarımsal değişiklikleri state değişimi olmöadan yapmamızı sağlar.

import React, { useEffect, useRef, useState } from 'react';

function UseRefInputDemo() {
	const inputRef = useRef<HTMLInputElement>(null);
	// document.getElementById(); UseRef Virtual dom üzerinden çalışmak direkt olarak nesne referansı üzerinden gerçek dom üzerinden nesneye erişerek çalışmamızı sağlar.
	return (
		<>
			<input ref={inputRef} />
			<button
				onClick={() => {
					(inputRef.current as HTMLInputElement).value = '';
				}}
			>
				Clear
			</button>
			<button
				onClick={() => {
					if (inputRef.current) {
						inputRef.current.style.background = 'red';
						inputRef.current.style.color = 'white';
					}
				}}
			>
				Click Me
			</button>
		</>
	);
}

export default UseRefInputDemo;

export function UseRefInputDemoWithState() {
	const [inptValue, setInputValue] = useState<string>('');
	const [bgColor, setbgColor] = useState('white');
	const [color, setColor] = useState('black');

	console.log('...rendering');

	return (
		<>
			<input
				onChange={(e) => setInputValue(e.target.value)}
				value={inptValue}
				style={{ background: bgColor, color: color }}
			/>
			<button onClick={() => setInputValue('')}>Clear</button>
			<button
				onClick={() => {
					setColor('white');
					setbgColor('red');
				}}
			>
				Click Me
			</button>
		</>
	);
}

export function BackgroundVariables() {
	// function içerisindeki değişkenler her bir durum değişikliğinde sıfırlarnır
	const [number, setNumber] = useState<number>(0);
	const [sum, setSum] = useState<number>(0);

	// let counter = 0;
	const counter = useRef(0);
	const number1 = useRef(0);
	const number2 = useRef(0);

	const click = () => {
		// counter = counter + 1;

		counter.current = counter.current + 1;
		// useRef bir sonraki render için değişken değeri sıfırlanmadan biz bu değeri kullanabiliriz.
		console.log('counter', counter.current);
		setNumber(counter.current * 3);
	};

	return (
		<>
			Number: {number}
			<br></br>
			<button onClick={click}>3'ün katlarını ekran yazdır</button>
			<hr></hr>
			<input
				type="text"
				onChange={(event: any) => {
					if (event.target) {
						number1.current = parseInt(event.target.value);
					}
				}}
				placeholder="number1"
			/>
			<br></br>
			<input
				type="text"
				onChange={(event: any) => {
					if (event.target) {
						number2.current = parseInt(event.target.value);
					}
				}}
				placeholder="number2"
			/>
			<button
				onClick={() => {
					setSum(number1.current + number2.current);
				}}
			>
				Topla
			</button>
			<hr></hr>
			Toplam : {sum}
		</>
	);
}
