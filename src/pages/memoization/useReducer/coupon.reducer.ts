export type CouponState = {
	quantity: number;
	unitPrice: number;
	totalAmount: number;
};

export type CouponActionType = 'QuantityChanged' | 'PriceChanged';

export type CouponAction = {
	type: CouponActionType; // type ise action tipi,
	payload: CouponState; // payload action dan gönderilen güncel değer
};

// Not: dışarıdan reducer gönderilen state göre state güncellemesi yapan function.
function CouponReducer(state: CouponState, action: CouponAction) {
	const total = action.payload.quantity * action.payload.unitPrice;

	console.log('state', state);
	console.log('action', action);

	if (action.type === 'QuantityChanged') {
		return { ...state, quantity: action.payload.quantity, totalAmount: total };
	} else if (action.type === 'PriceChanged') {
		return {
			...state,
			unitPrice: action.payload.unitPrice,
			totalAmount: total,
		};
	}

	return state;
}

export default CouponReducer;
