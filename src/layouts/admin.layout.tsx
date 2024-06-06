import React from 'react';

import {
	Link,
	NavLink,
	Outlet,
	useLocation,
	useNavigate,
} from 'react-router-dom';
import './layout.scss';

// Dosya isimleri küçük Component isimleri büyü harf ile başlayacak şekilde yazılacak.
function AdminLayout() {
	const location = useLocation();
	console.log('location', location);
	const navigate = useNavigate();
	// TS dosyasında bir linke yönlendirme yapmak istersek kullandığımız hook.

	return (
		<>
			<nav>
				<Link to="users">Admin Users</Link>{' '}
				<NavLink
					className={({ isActive }) => (isActive ? 'nav-active' : '')}
					to="users"
				>
					Users
				</NavLink>{' '}
				<NavLink
					className={({ isActive }) => (isActive ? 'nav-active' : '')}
					to="roles"
				>
					Roles
				</NavLink>{' '}
				<button
					onClick={() => {
						const result = window.confirm(
							'Yönlenmek istediğinize emin misiniz ?'
						);

						if (result) {
							navigate('/login');
						}
					}}
				>
					Use Navigate Sample
				</button>
			</nav>
			<main>
				<Outlet />
				{/* dinamik olarak içeriğin değişeceği yer */}
			</main>
			<footer>
				<p>Alt Bilgi</p>
			</footer>
		</>
	);
}

export default AdminLayout;
