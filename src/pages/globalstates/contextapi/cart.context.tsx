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
	loadFromStorage: () => void;
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
		const itemExist = cart.items.find((x) => x.id === item.id);

		let total: number = 0;

		if (itemExist) {
			itemExist.quantity += 1;
			cart.items = [...cart.items];
		} else {
			cart.items = [...cart.items, item];
		}

		cart.items.forEach((item) => {
			total += item.price * item.quantity;
		});
		cart.total = total;
		setCart({ ...cart });
		// sessionStorage.setItem('cart', JSON.stringify(cart));
		localStorage.setItem('cart', JSON.stringify(cart));
	};

	const removeFromCart = (id: number) => {
		const items = cart.items.filter((x) => x.id !== id);
		cart.items = [...items];
		let total: number = 0;
		cart.items.forEach((item) => {
			total += item.price * item.quantity;
		});
		cart.total = total;

		setCart({ ...cart });
	};

	// session bazlı verinin sepet bilginin tarayıcı refleshlendiğinde tekrardan yüklenmesini client state aktarılmasını sağladık.
	const loadFromStorage = () => {
		// const cart = sessionStorage.getItem('cart');

		const cart = localStorage.getItem('cart');
		console.log('cartState from load', cart);

		if (cart) {
			const cartObject = JSON.parse(cart) as CartState;
			setCart({ ...cartObject });
		}
	};

	const values = {
		cart,
		addToCart,
		removeFromCart,
		loadFromStorage,
	};

	return <CartContext.Provider value={values}>{children}</CartContext.Provider>;
}

export default CartProvider;
