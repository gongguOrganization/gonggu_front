import { call, put } from "redux-saga/effects";
import { customAxios } from "../customAxios";
import {  USER_CHECK_FAIL, USER_CHECK_SUCCESS } from "./actionType";

//userid 검사
const checkUserApi = () => {
	return customAxios(
		"/user/checkUser",
		"get",
	);
}

export const checkUser = function* (action) {
	try {
		const result = yield call(checkUserApi);
		yield put({ type: USER_CHECK_SUCCESS, data: result});
	} catch(err) {
		yield put({ type: USER_CHECK_FAIL, data: err.response.data });
	}
}
