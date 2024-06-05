// component içerisinde useReducer hook bağlanarak güncel state veya state güncelleme ile ilgili işlemleri başka bir servise devrediyoruz. State güncellmesini devrettiğimiz, delegate ettmiş servislere reducer service ismini veriyor.
// Component içerisinde birden fazla state tek bir durum için güncelleneceği senaryolara, merkezi local state yönetimi yapmamızı sağlıyor.

import React, { useReducer } from 'react';
import CouponReducer, { CouponState } from './coupon.reducer';

function UseReducerDemo() {
	const initialState: CouponState = {
		quantity: 1,
		unitPrice: 0,
		totalAmount: 0,
	};

	const [state, dispatch] = useReducer(CouponReducer, initialState);

	return (
		<>
			<input
				defaultValue={initialState.quantity}
				type="number"
				placeholder="Quantity"
				onChange={(e) => {
					dispatch({
						type: 'QuantityChanged',
						payload: {
							unitPrice: state.unitPrice,
							quantity: parseInt(e.target.value),
							totalAmount: state.totalAmount,
						},
					});
				}}
			/>
			<hr></hr>
			<input
				defaultValue={initialState.unitPrice}
				type="number"
				placeholder="UnitPrice"
				onChange={(e) => {
					dispatch({
						type: 'PriceChanged',
						payload: {
							unitPrice: parseInt(e.target.value),
							quantity: state.quantity,
							totalAmount: state.totalAmount,
						},
					});
				}}
			/>
			<hr></hr>
			<p>Total: {state.totalAmount}</p>
		</>
	);
}

export default UseReducerDemo;
