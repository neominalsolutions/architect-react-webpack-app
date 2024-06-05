// Parent Component

import React, { useState } from 'react';
import ReactMemoHeaderDemo from './reactmemo.header.demo';

// Eğer Parent Component deki bir state Child Componenteki bir Props güncelleyecek ise bu durumda react Memo devre dışı kalır. Virtual Dom değiştiğinde component tekrar render edilir.

function ReactMemoDemo() {
	const [random, setRandom] = useState<number>(0);

	const generateRandomNumber = () => {
		setRandom(Math.round(Math.random() * 1000));
	};

	console.log('...parent rendering');

	return (
		<>
			Random : {random}
			<br></br>
			<button onClick={generateRandomNumber}>Generate</button>
			<hr></hr>
			<ReactMemoHeaderDemo title={random.toString()} />
		</>
	);
}

export default ReactMemoDemo;
