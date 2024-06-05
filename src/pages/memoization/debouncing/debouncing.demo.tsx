import React, { useMemo, useState } from 'react';
import UseDataFetch from '../customHook/usedata.fetch';
import { Todo } from '../../../models/todo.model';
import debounce from '../../../utils/debounce';

function DebouncingDemo() {
	const [searchText, setSearchText] = useState<string>('');

	const { response, loading, error } = UseDataFetch<Product[]>(
		`?$filter=substringof('${searchText}',ProductName)&$format=json`
	);

	// Efektive bir serverside arama işlemi yaptık.
	const onSearch = useMemo(
		() =>
			debounce((e: any) => {
				setSearchText(e.target.value);
			}, 300),
		[searchText]
	);

	if (response) {
		return (
			<>
				{/* <input onChange={(e: any) => setSearchText(e.target.value)} /> */}
				<input onChange={onSearch} />
				<hr></hr>
				{response?.map((item) => {
					return <div key={item.ProductID}>{item.ProductName}</div>;
				})}
			</>
		);
	}
}

export default DebouncingDemo;
