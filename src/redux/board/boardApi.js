import axios from 'axios';
import { call, put } from 'redux-saga/effects';
import { READ_FAIL, CREATE_SUCCESS, CREATE_FAIL, UPDATE_VALUE, READ_SUCCESS, UPDATE_SUCCESS, UPDATE_FAIL } from './actionType';
import { customAxios } from "../customAxios";

//게시글 등록

const postBoardApi = (params) => {
	return axios.post(
		"http://localhost:8000/board-detail-service/board",
		params,
		{
			headers: {
				'Content-Type': 'multipart/form-data',
				'Authorization': `Bearer ${localStorage.getItem('token')}`,
			}
		}
	)
}

export const postBoard = function* (action) {

	console.log("action >> ", action);
	try {
		const result = yield call(postBoardApi, action.params.data);
		yield put({ type: CREATE_SUCCESS, data: result.data }); //put : 특성 액션을 디스패치
	} catch (err) {
		yield put({ type: CREATE_FAIL, data: err.response.data });
	}
}

//board의 state 업데이트
export const updateValue = function(action) {
	put({ type: UPDATE_VALUE, data: action.params });
}


//id로 특정 board 조회
export const selectValue = function* (action) {
	try {
		const result = yield call(getBoardApi, action.id);
		console.log("result >> ", result);
		yield put({ type: READ_SUCCESS, data: result.data });
	} catch(err) {
		yield put({ type: READ_FAIL, data: err});
	}
}

const getBoardApi = (id) => {
	return axios.get(
		`http://localhost:8000/board-detail-service/board/${id}`
	)
}

//게시글 수정
const updateBoardApi = (params) => {
	params.data.delete("regDate");
	return axios.put(
		"http://localhost:8000/board-detail-service/board/" + params.data.get("id"),
		params.data,
		{
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		}
	)
}

export const updateBoard = function* (action) {
	try {
		const result = yield call(updateBoardApi, action.params);
		yield put({ type: UPDATE_SUCCESS, data: result.data });
	} catch(err) {
		yield put({ type: UPDATE_FAIL, data: err });
	}
}
