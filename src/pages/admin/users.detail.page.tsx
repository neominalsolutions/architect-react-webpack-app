import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

function UserDetailPage() {
	// route üzerinden dinamik değerleri aşağıdaki hooklar ile yakalıyoruz.

	const params = useParams(); // id parameter yakalayacağız
	const [serachParams] = useSearchParams(); // querystring yakalayacağız

	return (
		<>
			id: {params.id}
			<br></br>
			queryString: {serachParams.get('email')} / {serachParams.get('name')}
		</>
	);
}

export default UserDetailPage;
