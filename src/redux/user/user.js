import { put, takeLatest } from "redux-saga/effects";
import { USER_CHECK, USER_CHECK_FAIL, USER_CHECK_SUCCESS } from "./actionType";
import { checkUser } from "./userApi";

//액션 함수
export const check = () => ({ type: USER_CHECK });

//사가함수
export function* UserCheckSaga() {
	yield takeLatest(USER_CHECK, checkUser);
}

//초기값
const initialUser = {
	isLogin: false,
	isProceed: false
};

//리듀서
const checkLogin = (state = initialUser, action) => {
	switch (action.type) {
		case USER_CHECK:
			state.isLogin = false;
			state.isProceed = false;
			return { ...state };
		case USER_CHECK_SUCCESS:
			state.isLogin = action.data;
			state.isProceed = true;
			return { ...state };
		case USER_CHECK_FAIL:
			state.isLogin = false;
			state.isProceed = true;
			return { ...state };
		default:
			return state;
	}
}

export default checkLogin;
