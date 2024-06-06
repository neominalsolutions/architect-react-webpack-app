import React, { useState } from 'react';
import useSWR, { Fetcher } from 'swr';
import { getProducts } from '../../services/product.service';
import { Link } from 'react-router-dom';

function ProductsSwrPaginationDemo() {
	const [skip, setSkip] = useState(0); // kaç tane kayıt atlatarak çekeceğimiz
	const [top, setTop] = useState(5); // kaçarlı çekeceğimiz
	const fetcher: Fetcher<Product[] | undefined, string> = (endpoint: string) =>
		getProducts(endpoint);

	const { data, isLoading, error } = useSWR(
		`https://services.odata.org/northwind/northwind.svc/Products?$format=json&$skip=${skip}&$top=${top}`,
		fetcher
		// { loadingTimeout: 5000, refreshInterval: 2000 }
	);

	if (isLoading) return <>Loading</>;

	if (error) return <>hata</>;

	if (data) {
		const products: Product[] = data as Product[];
		console.log('data', data);

		return (
			<>
				<Link to="/">Home Page</Link>
				<br></br>
				<hr></hr>
				<div>
					<select
						defaultValue={5}
						onChange={(e) => setTop(Number(e.target.value))}
					>
						<option value={2}>2 kayıt</option>
						<option value={5}>5 Kayıt</option>
						<option value={10}>10 Kayıt</option>
					</select>
				</div>
				{products.map((item) => {
					return <div key={item.ProductID}>{item.ProductName}</div>;
				})}

				<div>
					<span
						style={{
							cursor: 'pointer',
							padding: '5px',
							borderRadius: '5px',
							color: 'blue',
						}}
						onClick={() => setSkip(0)}
					>
						1.Sayfa
					</span>
					<span
						style={{
							cursor: 'pointer',
							padding: '5px',
							borderRadius: '5px',
							color: 'blue',
						}}
						onClick={() => setSkip(top * 1)}
					>
						2.Sayfa
					</span>
					<span
						style={{
							cursor: 'pointer',
							padding: '5px',
							borderRadius: '5px',
							color: 'blue',
						}}
						onClick={() => setSkip(top * 2)}
					>
						3.Sayfa
					</span>
				</div>
			</>
		);
	}

	return <></>;
}

export default ProductsSwrPaginationDemo;
