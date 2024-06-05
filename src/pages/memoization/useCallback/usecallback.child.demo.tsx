import React, { memo } from 'react';

type Props = {
	onSelect: (value: number) => void; // Action Props
};

function UseCallbackChildDemo({ onSelect }: Props) {
	console.log('child rendering...');
	return (
		<>
			<select onChange={(e) => onSelect(parseInt(e.target.value))}>
				<option value={1}>Seçim 1</option>
				<option value={2}>Seçim 2</option>
			</select>
		</>
	);
}

export default memo(UseCallbackChildDemo);
