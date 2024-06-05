// React Memo Parent ve Child Component ilişkisinde ortaya çıkar
// Parent Component içinde bir state değişiminde Child Component tekrar render alır
// Bu render sürecini ortadan kaldırmak için kullanılan bir teknik.
// Parent Component içinde bir state değişiminde Child Componenti ilgilendiren propslarda bir değişim olmalıdır. Eğer bu değişim yoksa component tekrar render edilmemelidir.

import React, { memo, useEffect } from 'react';
import reactLogo from '../../../assets/images/React.png';

type Props = {
	title: string;
};

// Child Component
function ReactMemoHeaderDemo({ title }: Props) {
	console.log('...rendering');

	const loadData = () => {
		console.log('...load Data');
	};

	useEffect(() => {
		console.log('useEffect');
	}, []);

	return (
		<>
			{title}
			<img style={{ height: 50, width: 100 }} src={reactLogo} alt="resim" />
			<button onClick={loadData}>load Data</button>
		</>
	);
}

export default memo(ReactMemoHeaderDemo);

// memo ile component props değişmediği sürece render alınmayacak.
