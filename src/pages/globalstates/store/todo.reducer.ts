import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

export interface Todo {
	title: string;
	id: number;
	completed: boolean;
}

export type TodoState = {
	data: Array<Todo>;
	error: any;
	loading: boolean;
	fetched: boolean;
};

export const fetchTodos = createAsyncThunk('FETCHTODOS', async () => {
	return (await axios.get('https://jsonplaceholder.typicode.com/todos')).data;
});

const initState: TodoState = {
	data: [],
	error: null,
	loading: false,
	fetched: false,
};

const todoSlice = createSlice({
	name: 'TODO',
	initialState: initState,
	reducers: {}, // senkron Redux işlemlerini yönetildiği kısım
	extraReducers(builder) {
		builder.addCase(fetchTodos.pending, (state: TodoState) => {
			state.loading = true;
		});
		builder.addCase(
			fetchTodos.fulfilled,
			(state: TodoState, action: PayloadAction<Todo[]>) => {
				state.loading = false;
				state.data = action.payload;
				state.fetched = true;
			}
		);
		builder.addCase(
			fetchTodos.rejected,
			(state: TodoState, action: PayloadAction<any>) => {
				state.error = action.payload;
				state.loading = false;
			}
		);
	},
});

export const todoReducer = todoSlice.reducer;

// Not: Redux ile ASYNC çalışırken extraReducers kısmını kendi içinde REDUX yönetir bu sebeple dışarı action çıkmaya gerek yok.
// reducers kısmı boş değilse bu durumda evet yazılabilir.
