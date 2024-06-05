import React, { Suspense, lazy } from 'react';

const ProductsPage = lazy(() => import('../products/products.page'));

type WrapperProps = {
	children?: React.ReactNode | undefined;
};

const Wrapper = ({ children }: WrapperProps) => {
	return <div style={{ padding: '5rem' }}>{children}</div>;
};

const Wrapper1 = () => {
	return <div style={{ padding: '5rem' }}></div>;
};

function LoginDemo() {
	return (
		<>
			<Suspense fallback={<>Products Loading</>}>
				<Wrapper>
					<ProductsPage />
				</Wrapper>

				{/* <Wrapper1>
            <a>Deneme</a>
        </Wrapper1> */}
			</Suspense>
			;
		</>
	);
}

export default LoginDemo;
