import React from 'react';
import ReactDOM from 'react-dom/client';
import { Link, RouterProvider, createBrowserRouter } from 'react-router-dom';
import AdminLayout from './layouts/admin.layout';

const App = () => {
	return <>Hello</>;
};
const router = createBrowserRouter([
	{
		path: '/login',
		element: <>Login Page</>,
	},
	{
		path: '/',
		element: (
			<>
				<Link to="/login">Login</Link>
				<p>Home Page</p>
			</>
		),
	},
	{
		path: '/admin', // prefix (Nested Routing, Nested Layout)
		Component: AdminLayout,
		children: [
			{
				path: 'users', // /admin/users
				element: <>Users page</>,
			},
			{
				path: 'roles', // /admin/roles
				element: <>Roles Page</>,
			},
		],
	},
	{
		path: '*',
		element: <>Sayfa Bulunamadı</>,
	},
]);

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

root.render(<RouterProvider router={router} />);
