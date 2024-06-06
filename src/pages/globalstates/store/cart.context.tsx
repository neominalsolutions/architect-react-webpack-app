// burada global olarak bir ürünün sepete girme ve sepetten çıkma işlemlerini yöneteceğimiz servis

import React, { ReactNode, createContext, useState } from 'react';

export interface CartItem {
	quantity: number;
	id: number;
	name: string;
	price: number;
}

export type CartState = {
	items: CartItem[]; // itemların kendisi
	total: number; // toplam fiyat
};

// Cart süreçlerini yöneteceğimiz servis uçları
export type CartContextType = {
	cart: CartState;
	addToCart: (item: CartItem) => void;
	removeFromCart: (id: number) => void;
};

// component üzerinden veriye erişimizi context sağlar
export const CartContext = createContext<CartContextType | null>(null);

// Providerlar wrapper componentlerdir.
/* 
<CartProvider>
  <A /> 
  <B /> 
</CartProvider>
*/

type CartProps = {
	children?: React.ReactNode | undefined;
};

function CartProvider({ children }: CartProps) {
	// State yönetimi State güncelleme işlemlerinden Provider Sorumlu
	const [cart, setCart] = useState<CartState>({ items: [], total: 0 });

	const addToCart = (item: CartItem) => {
		cart.items = [...cart.items, item];
		let total: number = 0;

		cart.items.forEach((item) => {
			total += item.price;
		});
		cart.total = total;

		setCart({ ...cart });
	};

	const removeFromCart = (id: number) => {
		const items = cart.items.filter((x) => x.id !== id);
		cart.items = [...items];
		let total: number = 0;
		cart.items.forEach((item) => {
			total += item.price;
		});
		cart.total = total;

		setCart({ ...cart });
	};

	const values = {
		cart,
		addToCart,
		removeFromCart,
	};

	return <CartContext.Provider value={values}>{children}</CartContext.Provider>;
}

export default CartProvider;
