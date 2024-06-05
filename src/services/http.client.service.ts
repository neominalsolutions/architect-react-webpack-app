import axios, {
	AxiosError,
	AxiosHeaders,
	AxiosResponse,
	InternalAxiosRequestConfig,
} from 'axios';

const axiosInstance = axios.create({
	timeout: 5000,
	timeoutErrorMessage: 'İstek zaman aşımına uğradı',
	baseURL: 'https://services.odata.org/northwind/northwind.svc/Products',
});

function OnRequestSuccess(config: InternalAxiosRequestConfig) {
	console.log('request', config);

	return config;
}

function OnRequestError(error: AxiosError) {
	console.log('error', error);
	// if(error.status === 500){

	// }
	return error;
}

function OnReponseSuccess(response: AxiosResponse) {
	console.log('reponse', response);

	return response;
}

function OnResponseError(error: AxiosError) {
	console.log('response-error', error);
	return Promise.reject(error);
}

function SetupInterceptors() {
	axiosInstance.interceptors.request.use(OnRequestSuccess, OnRequestError);
	axiosInstance.interceptors.response.use(OnReponseSuccess, OnResponseError);

	return axiosInstance;
}

const httpClient = SetupInterceptors();

export function get(endPoint: string, headers?: AxiosHeaders) {
	return httpClient.get(endPoint, {
		headers: headers,
		signal: AbortSignal.timeout(3000),
	});
}

export function post(endPoint: string, param: any, headers?: AxiosHeaders) {
	return httpClient.post(endPoint, param, {
		headers: headers,
		signal: AbortSignal.timeout(3000),
	});
}

export const httpClientModule = {
	get,
	post,
};

export default httpClientModule;
