// Todos Api istek atıp Todos bilgisini Client State üzerindne çağıracağımız bir mekanizma kurmak.
// Uygulama ilk ayağa kalkarken bu Todos bilgilerini API üzerinden çalışıracak action dispatch ile tetikleyeceğiz. Bu sayfa gelidğimizde server state client state dönüşmüş olacak.

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/redux.store';

function TodoReduxPage() {
	const todoState = useSelector((state: RootState) => state.todoState);

	if (todoState.loading) return <>Loading</>;

	if (todoState.error) return <>Hata Var</>;

	if (todoState.fetched) {
		return (
			<div>
				{todoState.data.map((item) => {
					return <div key={item.id}>{item.title}</div>;
				})}
			</div>
		);
	}

	return <></>;
}

export default TodoReduxPage;
