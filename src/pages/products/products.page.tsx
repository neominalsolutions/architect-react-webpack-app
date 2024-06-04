import axios from 'axios';
import React, { FormEvent, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useSearchParams } from 'react-router-dom';

function ProductsPage() {
	const [searchParams] = useSearchParams({ q: '' }); // querystring state set etme yada get etme
	const [productName, setProductName] = useState(''); // Input Change olduğundaki değeri alır
	const navigate = useNavigate(); // yönlendirme
	const [mode, setMode] = useState('');

	const onSearchInput = (event: any) => {
		setProductName(event.target.value);
	};

	const onFormSubmit = (event: FormEvent) => {
		event.preventDefault(); // form post olmasın spa uygulama olduğunda aynı sayfada kalmak için yaptık.
		// products?q=chai link

		if (mode === 'clientside') {
			navigate(`/products?q=${productName}`);
			loadData(); // yeniden render almadığında işlem sonrası operasyonu çağırdık
			// window.scroll(0,0); // sayfada scroll varsa sayfayı en üste filtreleme sonrası çıkar.
		} else {
			window.location.href = `/products?q=${productName}`;
		}
	};

	const loadData = () => {
		console.log('search', searchParams.get('q'));

		const searchText =
			mode === 'clientside' ? productName : searchParams.get('q');

		console.log('searchText', searchText);

		axios
			.get(
				`https://services.odata.org/northwind/northwind.svc/Products?$filter=substringof('${searchText}',ProductName)&$format=json`
			)
			.then((response) => {
				console.log('data', response.data);
			});
	};

	useEffect(() => {
		console.log('rendering...');
		loadData();
	}, []);

	return (
		<>
			<Helmet>
				<title>Ürünlerimiz</title>
				<meta name="description" content="React App"></meta>
				<meta name="keywords" content="Products,Ürünler"></meta>
			</Helmet>
			<form method="GET" onSubmit={onFormSubmit}>
				<input onChange={onSearchInput} placeholder="ürün ismi arayınız" />
				<br></br>
				Mode: {mode}
				<select
					defaultValue={''}
					onChange={(e: any) => setMode(e.target.value)}
				>
					<option disabled value={''}>
						Seçim Yapınız
					</option>
					<option value={'clientside'}>ClientSide</option>
					<option value={'serverside'}>ServerSide</option>
				</select>
				<br></br>
				<input type="submit" value="Arama Yap" />
			</form>
		</>
	);
}

export default ProductsPage;
