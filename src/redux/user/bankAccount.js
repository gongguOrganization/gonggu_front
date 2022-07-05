import { takeLatest } from "redux-saga/effects";
import { GET_BANK_ACCOUNT, GET_BANK_ACCOUNT_FAIL, GET_BANK_ACCOUNT_SUCCESS } from "./actionType";
import { getBankAccount } from "./bankAccountApi";

//액션 함수
export const getBank = (userId) => ({ type: GET_BANK_ACCOUNT, params: { userId } });

//사가 함수
export function* BankAccountSaga() {
	yield takeLatest(GET_BANK_ACCOUNT, getBankAccount);
}

//초기값
const initialBankAccount = {
	bank: "",
	bankAccount: "",
	name: ""
}

//리듀서
const bankAccount = (state = initialBankAccount, action) => {
	switch(action.type) {
		case GET_BANK_ACCOUNT:
			return state;
		case GET_BANK_ACCOUNT_SUCCESS:
			return {bank: action.data.bank, bankAccount: action.data.bankAccount, name: action.data.name};
		case GET_BANK_ACCOUNT_FAIL:
			return state;
		default:
			return state;
	}
}

export default bankAccount;
