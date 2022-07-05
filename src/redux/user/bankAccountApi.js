import { customAxios } from "../customAxios";
import { GET_BANK_ACCOUNT_SUCCESS, GET_BANK_ACCOUNT_FAIL } from "./actionType";
import { call, put } from "redux-saga/effects";

//user의 은행계좌 가져오기
const getBankAccountApi = (userId) => {
	return customAxios(
		`/user/getBankAccount/${userId}`,
		"get"
	);
}

export const getBankAccount = function* (action) {
	try {
		const result = yield call(getBankAccountApi, action.params.userId);
		yield put({ type: GET_BANK_ACCOUNT_SUCCESS, data: result });
	} catch(err) {
		yield put({ type: GET_BANK_ACCOUNT_FAIL, data: err.response.data });
	}
}
