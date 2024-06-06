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
		},
	},
});

export const cartReducer = cartSlice.reducer;
export const { ReduxAddToCart, ReduxRemoveFromCart } = cartSlice.actions;

// 3. adım reducer yazdık store reducer tanımladık.
