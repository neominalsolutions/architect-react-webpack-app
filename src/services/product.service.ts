import httpClientModule from './http.client.service';

export const getProducts = async (endpoint?: string) => {
	console.log('endPoint', endpoint);

	try {
		const response = await httpClientModule.get(endpoint as string);
		// console.log('veri', response);
		// return response;
		return response.data.value;
	} catch (error) {
		return Promise.reject(error);
	}
};
