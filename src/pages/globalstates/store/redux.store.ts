import { configureStore } from '@reduxjs/toolkit';
import { cartReducer } from './cart.reducer';

export const store = configureStore({
	reducer: {
		cartState: cartReducer, // store reducer tanıttığımız kısım.
	},
});

export type RootState = ReturnType<typeof store.getState>; // store statelere erişim noktamı
export type AppDispatch = typeof store.dispatch; // storedaki state güncelleme noktası

// Tüm statelere buradan erişim sağlıyacağız
// Context API createContext benzer bir yapı

// 1. Adım
