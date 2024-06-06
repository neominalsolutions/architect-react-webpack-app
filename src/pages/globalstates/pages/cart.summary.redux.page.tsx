import React, { useContext } from 'react';
import { CartContext, CartContextType } from '../contextapi/cart.context';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/redux.store';
import { ReduxCartState, ReduxRemoveFromCart } from '../store/cart.reducer';

function CartSummaryReduxPage() {
	const cartState = useSelector((state: RootState) => state.cartState);
	const dispatch = useDispatch<AppDispatch>();

	const onDeleteItem = (id: number) => {
		// State değişiminde component virtual domdan dolayı render alır.
		dispatch(ReduxRemoveFromCart({ id: id }));
	};

	return (
		<>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					flexWrap: 'wrap',
					justifyContent: 'space-between',
				}}
			>
				{cartState.items.map((item) => {
					return (
						<div key={item.id}>
							<div>
								{item.name} x {item.quantity} ={' '}
								{(item.quantity * item.price).toFixed(2)}
							</div>
							<div>
								<button onClick={() => onDeleteItem(item.id)}>
									Sepetten Çıkar
								</button>
							</div>
						</div>
					);
				})}

				<div>Total: {cartState.total.toFixed(2)} TL</div>
			</div>
		</>
	);
}

export default CartSummaryReduxPage;
