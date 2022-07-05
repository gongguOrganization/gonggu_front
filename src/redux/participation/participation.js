import produce from "immer";
import { takeLatest } from "redux-saga/effects";
import { PARTI_JOIN_LIST_FAIL, PARTI_JOIN_LIST_SUCCESS, PARTI_JOIN_LIST, PARTI_CREATE, PARTI_DELETE, PARTI_CREATE_SUCCESS, PARTI_CREATE_FAIL, PARTI_DELETE_SUCCESS, PARTI_DELETE_FAIL, PARTI_JOIN_STATE, PARTI_JOIN_STATE_SUCCESS,  PARTI_JOIN_STATE_FAIL } from "./actionType";
import { getjoinList, exitParticipation, joinParticipation, checkJoinState } from "./participationApi";

//액션 함수
export const create = (params) => ({ type: PARTI_CREATE, params });
export const remove = (params) => ({ type: PARTI_DELETE, params });
export const joinState = (params) => ({ type: PARTI_JOIN_STATE, params });
export const joinList = (params) => ({ type: PARTI_JOIN_LIST, params });

//사가 함수
export function* PartSaga() {
	yield takeLatest( PARTI_CREATE, joinParticipation);
	yield takeLatest( PARTI_DELETE, exitParticipation);
	yield takeLatest( PARTI_JOIN_STATE, checkJoinState);
	yield takeLatest( PARTI_JOIN_LIST, getjoinList);
}

//초기 상태
const initalParticipation = {
	data : false,
	list : [],
	loading: false,
	success: false
}

//rducer
const participation = (state = initalParticipation, action) =>
	produce(state, draft => {
		switch (action.type) {
			case PARTI_CREATE:
				draft.loading = true;
				draft.success = false;
				draft.data = false;
				break;
			case PARTI_CREATE_SUCCESS:
				draft.loading = false;
				draft.success = true;
				draft.data = true;
				break;
			case PARTI_CREATE_FAIL:
				draft.loading = false;
				draft.success = false;
				draft.data = false;
				break;
			case PARTI_DELETE:
				draft.loading = true;
				draft.success = false;
				draft.data = false;
				break;
			case PARTI_DELETE_SUCCESS:
				draft.loading = false;
				draft.success = true;
				draft.data = false;
				break;
			case PARTI_DELETE_FAIL:
				draft.loading = false;
				draft.success = false;
				draft.data = false;
				break;
			case PARTI_JOIN_STATE:
				draft.loading = true;
				draft.success = false;
				draft.data = false;
				break;
			case PARTI_JOIN_STATE_SUCCESS:
				draft.data = action.data;
				draft.success = true;
				draft.loading = false;
				break;
			case PARTI_JOIN_STATE_FAIL:
				draft.data = false;
				draft.success = false;
				draft.loading = false;
				break;
			case PARTI_JOIN_LIST:
				draft.loading = true;
				break;
			case PARTI_JOIN_LIST_SUCCESS:
				draft.list = action.data;
				break;
			case PARTI_JOIN_LIST_FAIL:
				draft.success = action.data;
				break;
			default:
				return state;
		}
	})


export default participation;
