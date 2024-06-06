import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

type LoginInput = {
	email: string;
	password: string;
};

function LoginFormDemoPage() {
	const schema = yup
		.object({
			email: yup
				.string()
				.email('E-posta formatında değil')
				.required('Email boş geçilemez'),
			password: yup
				.string()
				.min(8, 'Min 8 karakter olmalıdır')
				.required('Parola boş geçilemez'),
		})
		.required();

	const {
		handleSubmit,
		register,
		formState: { errors, isValid },
		watch,
		reset,
		setValue,
		getValues,
	} = useForm<LoginInput>({
		resolver: yupResolver(schema),
	});

	useEffect(() => {
		setValue('email', 'test@test.com');
	}, []);

	const onFormSubmit = (data: LoginInput) => {
		console.log('data', data);
	};

	const emailInputValue = watch('email');
	console.log('emailInputValue', emailInputValue);

	return (
		<>
			<form onSubmit={handleSubmit(onFormSubmit)}>
				{/* <input
					{...register('email', {
						required: { value: true, message: 'E-posta boş geçilemez' },
					})}
				/> */}
				<input type="text" {...register('email')} />
				<span>{errors.email?.message}</span>
				<br></br>
				<input type="text" {...register('password')} />
				<span>{errors.password?.message}</span>
				<br></br>
				<input disabled={!isValid} type="submit" />
				<button onClick={() => reset()}>Reset</button>
				<button
					onClick={() => {
						alert(getValues('email'));
					}}
				>
					Get Value
				</button>
			</form>
		</>
	);
}

export default LoginFormDemoPage;
