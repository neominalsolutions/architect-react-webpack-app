import React, { Suspense, lazy } from 'react';
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
import UseMemoDemo from './pages/memoization/useMemo/usememo.demo';
import UseCallBackParentDemo from './pages/memoization/useCallback/usecallback.parent.demo';
import UseRefInputDemo, {
	BackgroundVariables,
	UseRefInputDemoWithState,
} from './pages/memoization/useRef/useref.demo';
import UseReducerDemo from './pages/memoization/useReducer/usereducer.demo';
import UseImperativeHandleDemo from './pages/memoization/useImperative/useimperative.demo';
import CustomHookDemo from './pages/memoization/customHook/custom.hook.demo';
import Login from './pages/account/login.demo';
import LoginDemo from './pages/account/login.demo';
// import DebouncingDemo from './pages/memoization/debouncing/debouncing.demo';

// Code Splitting ile ilk açılış performans takniği
const DebouncingDemo = lazy(
	() => import('./pages/memoization/debouncing/debouncing.demo')
);

// Tüm yukarıdaki Import kısımlarını lazy load işlemine çeviriyoruz.

const App = () => {
	return <>Hello</>;
};
const router = createBrowserRouter([
	{
		path: '/login',
		Component: LoginDemo,
	},
	{
		path: '/products',
		Component: ProductsPage,
	},
	{
		path: '/memoization',
		element: (
			<div>
				<Link to="/memoization/reactMemo"> React memo Demo</Link>{' '}
				<Link to="/memoization/useMemo"> UseMemo Demo</Link>{' '}
				<Link to="/memoization/useCallback">UseCallback Demo</Link>{' '}
				<Link to="/memoization/useRefInputDemo">UseRef Input Demo</Link>{' '}
				<Link to="/memoization/useRefInputWithStateDemo">
					{' '}
					UseRef Input With State Demo
				</Link>
				<Link to="/memoization/backgroundVariables">
					Background Variables
				</Link>{' '}
				<Link to="/memoization/useReducerDemo"> UseReducer Demo</Link>{' '}
				<Link to="/memoization/useImperativeDemo"> UseImperativeDemo Demo</Link>{' '}
				<Link to="/memoization/customHook"> Custom Hook Demo</Link>{' '}
				<Link to="/memoization/debouncingDemo"> Debouncing Demo</Link>
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
			{
				path: 'useMemo',
				Component: UseMemoDemo,
			},
			{
				path: 'useCallback',
				Component: UseCallBackParentDemo,
			},
			{
				path: 'useRefInputDemo',
				Component: UseRefInputDemo,
			},
			{
				path: 'useRefInputWithStateDemo',
				Component: UseRefInputDemoWithState,
			},
			{
				path: 'backgroundVariables',
				Component: BackgroundVariables,
			},
			{
				path: 'useReducerDemo',
				Component: UseReducerDemo,
			},
			{
				path: 'useImperativeDemo',
				Component: UseImperativeHandleDemo,
			},
			{
				path: 'customHook',
				Component: CustomHookDemo,
			},
			{
				path: 'debouncingDemo',
				Component: DebouncingDemo,
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
	<Suspense fallback={<>Component Doma yüklenemedi</>}>
		<HelmetProvider>
			<RouterProvider router={router} />
		</HelmetProvider>
	</Suspense>
);
