import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface ReduxCartItem {
	quantity: number;
	id: number;
	name: string;
	price: number;
}

export type ReduxCartState = {
	items: ReduxCartItem[]; // itemların kendisi
	total: number; // toplam fiyat
};

const initialState: ReduxCartState = { items: [], total: 0 };

const cartSlice = createSlice({
	name: 'CART',
	initialState: initialState,
	reducers: {
		loadFromReduxLocalStorage: (state: ReduxCartState) => {
			const cart = localStorage.getItem('reduxCartState');
			console.log('cartState from load', cart);

			if (cart) {
				const cartObject = JSON.parse(cart) as ReduxCartState;
				state.items = cartObject.items;
				state.total = cartObject.total;
			}
		},
		//state değiştireceğimiz algoritmayı function bazlı yazıyoruz
		ReduxAddToCart: (
			state: ReduxCartState,
			action: PayloadAction<ReduxCartItem>
		) => {
			const itemExist = state.items.find((x) => x.id === action.payload.id);

			if (itemExist) {
				itemExist.quantity += 1;
			} else {
				// referans hatası oluşak bir durum olmadıdğında spread operatör kullanımına gerek kalmıyor.
				state.items.push(action.payload);
			}

			let total = 0;

			state.items.forEach((item) => {
				total += item.price * item.quantity;
			});

			state.total = total;

			localStorage.setItem('reduxCartState', JSON.stringify(state));
		},
		ReduxRemoveFromCart: (
			state: ReduxCartState,
			action: PayloadAction<{ id: number }>
		) => {
			state.items = state.items.filter((x) => x.id !== action.payload.id);
			// silinecekler dışındaki getir.
			let total = 0;

			state.items.forEach((item) => {
				total += item.price * item.quantity;
			});

			state.total = total;

			if (state.total !== 0) {
				localStorage.setItem('reduxCartState', JSON.stringify(state));
			} else {
				localStorage.removeItem('reduxCartState');
			}
		},
	},
});

export const cartReducer = cartSlice.reducer;
export const {
	ReduxAddToCart,
	ReduxRemoveFromCart,
	loadFromReduxLocalStorage,
} = cartSlice.actions;

// 3. adım reducer yazdık store reducer tanımladık.
