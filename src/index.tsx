import React, { Suspense, lazy, useContext, useEffect } from 'react';
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
import ProductPages from './pages/globalstates/pages/products.page';
import CartProvider, {
	CartContext,
	CartContextType,
} from './pages/globalstates/contextapi/cart.context';
import CartSummary from './pages/globalstates/pages/cart.summary.page';
import CartSummaryPage from './pages/globalstates/pages/cart.summary.page';
import { Provider, useDispatch } from 'react-redux';
import { AppDispatch, store } from './pages/globalstates/store/redux.store';
import CartSummaryReduxPage from './pages/globalstates/pages/cart.summary.redux.page';
import { loadFromReduxLocalStorage } from './pages/globalstates/store/cart.reducer';
import TodoReduxPage from './pages/globalstates/pages/todo.redux.page';
import { fetchTodos } from './pages/globalstates/store/todo.reducer';
import ProductsSwrPaginationDemo from './pages/swr/products.swr.pagination.demo';
import LoginFormDemoPage from './pages/reactFormsHook/login.form.demo';
// import DebouncingDemo from './pages/memoization/debouncing/debouncing.demo';

// Code Splitting ile ilk açılış performans takniği
const DebouncingDemo = lazy(
	() => import('./pages/memoization/debouncing/debouncing.demo')
);

// Tüm yukarıdaki Import kısımlarını lazy load işlemine çeviriyoruz.

import './style.scss';

const App = () => {
	// uygulama refleshlendiğinde buraya düşecek ve burdan session storage bir bilgi varsa session güncellenecek.

	return (
		<>
			<Link to="/login">Login</Link> <Link to="/memoization">Memoization</Link>{' '}
			<Link to="/global-state">Context API / Redux</Link>{' '}
			<Link to="/products">Ürünlerimiz</Link>
			<Link to="/swr">Swr</Link> <Link to="/forms-hook">Forms Hook</Link>
			<br></br>
			<button className="bg-red-300 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded-full">
				Button
			</button>
			<h1 className="text-3xl font-bold underline">Hello world!</h1>
		</>
	);
};

const GlobalStateHomePage = () => {
	const { loadFromStorage } = useContext(CartContext) as CartContextType;
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		console.log('global state init');
		loadFromStorage(); // contextAPI doldurma
		dispatch(loadFromReduxLocalStorage()); // Redux ile doldurma
		dispatch(fetchTodos()); // asenkron olarak veriyi api ye git load et.
	}, []);

	return (
		<>
			<nav>
				<Link to="/global-state/products">Ürünler </Link>{' '}
				<Link to="/global-state/cart-summary">Sepet Detay</Link>{' '}
				<Link to="/global-state/cart-summary-v2">Sepet Detay Redux</Link>{' '}
				<Link to="/global-state/todo-redux">Todo Redux Page</Link>
			</nav>
			<Outlet />
		</>
	);
};

const router = createBrowserRouter([
	{
		path: '/forms-hook',
		Component: LoginFormDemoPage,
	},
	{
		path: '/swr',
		Component: ProductsSwrPaginationDemo,
	},
	{
		path: '/login',
		Component: LoginDemo,
	},
	{
		path: '/products',
		Component: ProductsPage,
	},
	{
		path: '/global-state',
		Component: GlobalStateHomePage,
		children: [
			{
				path: 'products',
				Component: ProductPages,
			},
			{
				path: 'cart-summary',
				Component: CartSummaryPage,
			},
			{
				path: 'cart-summary-v2',
				Component: CartSummaryReduxPage,
			},
			{
				path: 'todo-redux',
				Component: TodoReduxPage,
			},
		],
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
		Component: App,
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
			<Provider store={store}>
				<CartProvider>
					<RouterProvider router={router} />
				</CartProvider>
			</Provider>
		</HelmetProvider>
	</Suspense>
);

// 2. Adım react-redux paketindeki provider tanımı
