import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface User {
	name: string;
	username: string;
	email: string;
	id: number;
}

function UsersPage() {
	// network istek sinyali
	const [users, setUsers] = useState<User[]>([]); // state
	const abortController = new AbortController();

	useEffect(() => {
		// component didmount karşılık gelir.
		fetch('https://jsonplaceholder.typicode.com/users', {
			signal: abortController.signal,
		})
			.then((response) => {
				return response.json();
			})
			.then((data: User[]) => {
				setUsers(data);
				console.log('users', data);
			});

		return () => {
			// clean up functions => component willunmount işlemine karşılık gelir.
			// Domdan ayrıldığımızda network singnal kesilir.
			abortController.abort(); // network request domdan ayrılırken kesilsin.
		};
	}, []);

	return (
		<>
			{users && (
				<div>
					{users.map((item: User) => {
						return (
							<div key={item.id}>
								{/* /admin/users/1 */}
								<Link to={item.id.toString()}>{item.username}</Link>
								{/* /admin/user?email=ali&name=tansu */}
								<br></br>
								<Link to={`search?email=${item.email}&name=${item.name}`}>
									{item.email}
								</Link>
							</div>
						);
					})}
				</div>
			)}
		</>
	);
}

export default UsersPage;
