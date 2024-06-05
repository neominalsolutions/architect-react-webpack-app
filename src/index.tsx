import React from 'react';
import ReactDOM from 'react-dom/client';
import {
	Link,
	Outlet,
	RouterProvider,
	createBrowserRouter,
} from 'react-router-dom';
import AdminLayout from './layouts/admin.layout';
import UsersPage from './pages/admin/users.page';
import UserDetailPage from './pages/admin/users.detail.page';
import ProductsPage from './pages/products/products.page';
import { HelmetProvider } from 'react-helmet-async';
import ReactMemoDemo from './pages/memoization/reactMemo/reactmemo.demo';

const App = () => {
	return <>Hello</>;
};
const router = createBrowserRouter([
	{
		path: '/login',
		element: <>Login Page</>,
	},
	{
		path: '/products',
		Component: ProductsPage,
	},
	{
		path: '/memoization',
		element: (
			<div>
				<Link to="/memoization/reactMemo"> React memo Demo</Link>
				<div>
					<Outlet />
				</div>
			</div>
		),
		children: [
			{
				path: 'reactMemo',
				Component: ReactMemoDemo,
			},
		],
	},
	{
		path: '/',
		element: (
			<>
				<Link to="/login">Login</Link> <Link to="/products">Ürünlerimiz</Link>
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
				Component: UsersPage,
			},
			{
				path: 'users/:id',
				Component: UserDetailPage,
			},
			{
				path: 'users/search',
				Component: UserDetailPage,
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

root.render(
	<HelmetProvider>
		<RouterProvider router={router} />
	</HelmetProvider>
);
