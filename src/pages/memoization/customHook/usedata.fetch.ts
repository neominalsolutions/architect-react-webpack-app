// Componentlere özellik kazandıran özel functionlara biz hook.
// Bu custom hook ile component veri çekerken, veri çekme sürecindeki aşamaları yakalayıp, componenti buna göre render etmek istiyoruz.

import { AxiosError, AxiosHeaders, AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import httpClientModule from '../../../services/http.client.service';

function UseDataFetch<ResponseType>(endPoint: string, header?: AxiosHeaders) {
	const [loading, setLoading] = useState<boolean>(false);
	const [response, setResponse] = useState<ResponseType>();
	const [error, setError] = useState<any>();

	const loadData = async () => {
		try {
			const data = (await httpClientModule.get(endPoint, header)).data;

			if (data.value) {
				setResponse(data.value);
			} else {
				setResponse(data);
			}

			setLoading(false);
		} catch (error) {
			setError(error);
			setLoading(false);
		}
	};

	useEffect(() => {
		console.log('enpoint değişince data load tekrar çalışır');

		setLoading(true);
		loadData();
	}, [endPoint]);
	// enpoint değiştiğinde data yeniden load edildi.

	return { loading, response, error };
}

export default UseDataFetch;
