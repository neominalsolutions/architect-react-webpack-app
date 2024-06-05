import React, { useState } from 'react';
import UseDataFetch from './usedata.fetch';
import { Todo } from '../../../models/todo.model';

interface User {
	id: number;
	username: string;
}

function CustomHookDemo() {
	// const [endPoint, setEndPoint] = useState<string>(
	// 	'https://jsonplaceholder.typicode.com/todos'
	// );

	// Not Hooklar sadece Function Body de çağırılır
	// bir function tetiklendiğinde Hook çağıramayız

	const { loading, response, error } = UseDataFetch<Todo[]>(
		'https://jsonplaceholder.typicode.com/todos'
	);

	// const userState = UseDataFetch<User[]>(
	// 	'https://jsonplaceholder.typicode.com/users'
	// );

	// if (userState.response) {
	// 	console.log('user-state-load-edildi');
	// }

	// const todoState = UseDataFetch<Todo[]>(
	// 	'https://jsonplaceholder.typicode.com/todos'
	// );

	// if (todoState.response) {
	// 	console.log('Todo State load edildi');
	// }

	if (loading) return <>...Loading</>;

	if (error) return <>Hata Meydana Geldi</>;

	if (response) {
		return (
			<>
				{/* <p>EndPoint : {endPoint}</p> */}
				<br></br>
				{/* <button
					onClick={() =>
						setEndPoint('https://jsonplaceholder.typicode.com/users')
					}
				>
					Fetch Users
				</button> */}

				<button
					onClick={() => {
						// UseDataFetch('www.google.com'); Hatalı bir kullanım.
					}}
				>
					Hatalı Çağırı
				</button>
				{response.map((item: any) => {
					return (
						<div key={item.id}>
							{item.title} {item.username}
						</div>
					);
				})}
			</>
		);
	}

	return <></>;
}

export default CustomHookDemo;
