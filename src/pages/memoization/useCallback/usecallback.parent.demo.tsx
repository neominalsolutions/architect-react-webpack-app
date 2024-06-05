// React memo gibi Parent ve Child Component ile birlikte ortaya çıkan bir durum

import React, { useCallback, useState } from 'react';
import UseCallbackChildDemo from './usecallback.child.demo';

// Child Component de Props fırlatan bir action olduu durumda React Memo kullansak dahi component gereksiz yere render alınır.
function UseCallBackParentDemo() {
	console.log('parent rendering...');

	const [random, setRandom] = useState<number>(0);

	const onDropdownSelect = useCallback((value: number) => {
		console.log('seçim' + value);
	}, []);

	// const onDropdownSelect1 =(value: number) => {
	// 		console.log('seçim' + value);
	// };

	return (
		<>
			<UseCallbackChildDemo onSelect={onDropdownSelect} />
			<br></br>
			<button onClick={() => setRandom(Math.random())}>{random}</button>
		</>
	);
}

export default UseCallBackParentDemo;
