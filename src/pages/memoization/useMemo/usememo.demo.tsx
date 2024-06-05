import React, { useMemo, useState } from 'react';

// react Memo ile useMemo arasındaki fark, use Memo component içindeki bir değerin memoization ile ilgilenir. Her bir render da bu değer tekrar tekrar hesaplanmayacak ise gereksiz yere bu değeri hesaplamanın bir mantığı yoktur.

function UseMemoDemo() {
	const [random, setRandom] = useState<number>(0);

	function calc() {
		console.log('calculating...');
		return 10;
	}

	// [] ile kullanıldığında doma ilk girişte hesapla birdaha bunu hesaplama neden çünkü calculationValue herhangi bir dependecy bağımlılığı yok.
	const calculationValue = useMemo(() => calc(), []);

	function calcWithDeps() {
		console.log('calculating with Deps...');
		return random * 10;
	}

	const calculationValue1 = useMemo(() => calcWithDeps(), [random]);

	return (
		<>
			Value : {calculationValue}
			<br></br>
			Value With Random Deps : {calculationValue1}
			<br></br>
			Random : {random}
			<br></br>
			<button onClick={() => setRandom(Math.random())}>Random</button>
		</>
	);
}

export default UseMemoDemo;
