import React, { useContext } from 'react';
import { CartContext, CartContextType } from '../contextapi/cart.context';

function CartSummaryPage() {
	const { cart, removeFromCart } = useContext(CartContext) as CartContextType;

	const onDeleteItem = (id: number) => {
		removeFromCart(id);
		// State değişiminde component virtual domdan dolayı render alır.
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
				{cart.items.map((item) => {
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

				<div>Total: {cart.total.toFixed(2)} TL</div>
			</div>
		</>
	);
}

export default CartSummaryPage;
