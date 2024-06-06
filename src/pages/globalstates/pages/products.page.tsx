import React, { useContext, useEffect, useState } from 'react';
import {
	ProductDto,
	getProducts,
} from '../../../services/product.mock.service';

import './products.page.scss';
import { CartContext, CartContextType } from '../contextapi/cart.context';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/redux.store';
import { ReduxAddToCart } from '../store/cart.reducer';

function ProductPages() {
	const [products, setProducts] = useState<ProductDto[]>();
	const { cart, addToCart } = useContext(CartContext) as CartContextType;

	// değer değiştirme işlemlerini dispatch bırakılmış
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		getProducts()
			.then((data) => {
				setProducts(data as ProductDto[]);
			})
			.catch((err) => {
				console.log('err', err);
			});
	}, []);

	const onAddToCart = (item: ProductDto) => {
		console.log('sepete ekle');
		addToCart({
			id: item.ProductID,
			name: item.ProductName,
			quantity: 1,
			price: item.UnitPrice * 1.15,
		});

		window.alert('Ürün Sepete Eklendi');
	};

	const onAddToCartRedux = (item: ProductDto) => {
		window.alert('Ürün Sepete Eklendi');
		// Not actionları çalıştırmak dispath üzerinden işlem yaparız.
		dispatch(
			ReduxAddToCart({
				id: item.ProductID,
				name: item.ProductName,
				quantity: 1,
				price: item.UnitPrice * 1.5,
			})
		);
	};

	return (
		<>
			<Link to="/">Home</Link>
			<div>Toplam Tutar : {cart.total.toFixed(2)}</div>
			<hr></hr>
			<div className="flex">
				{products?.map((item) => {
					return (
						<div key={item.ProductID}>
							<div>{item.ProductName}</div>
							<div>Fiyat : {(item.UnitPrice * 1.15).toFixed(2)} TL</div>
							<div>Stok: {item.UnitsInStock} adet</div>
							<div>
								<button onClick={() => onAddToCart(item)}>Sepete Ekle</button>
							</div>

							<div>
								<button onClick={() => onAddToCartRedux(item)}>
									Sepete Ekle With Redux
								</button>
							</div>
						</div>
					);
				})}
			</div>
		</>
	);
}

export default ProductPages;
