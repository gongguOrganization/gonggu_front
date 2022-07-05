import { takeLatest, takeEvery, call, put } from "redux-saga/effects";
import { deleteAnswerApi, insertAnswerApi } from "./qnaAndAnswerApi";
import produce from "immer";
import {
  ANSWER_CREATE,
  ANSWER_CREATE_SUCCESS,
  ANSWER_CREATE_FAIL,
  ANSWER_DELETE,
  ANSWER_DELETE_SUCCESS,
  ANSWER_DELETE_FAIL,
  ANSWER_SELECT,
  ANSWER_TEMP
} from "./actionType";

//액션 함수
export const answerCreate = (params) => ({ type: ANSWER_CREATE, params });
export const answerDelete = (params) => ({ type: ANSWER_DELETE, params });
export const answerSelect = () => ({ type: ANSWER_SELECT });

function* insertAnswer(action) {
  try {
    const result = yield call(insertAnswerApi, action.params);
    yield put({ type: ANSWER_CREATE_SUCCESS, data: result.data }); //put : 특성 액션을 디스패치
  } catch (err) {
    yield put({ type: ANSWER_CREATE_FAIL, data: err.response.data });
  }
}

function* deleteAnswer(action) {
  try {
    const result = yield call(deleteAnswerApi, action.params);

    yield put({ type: ANSWER_DELETE_SUCCESS, data: result.data }); //put : 특성 액션을 디스패치
  } catch (err) {
    yield put({ type: ANSWER_DELETE_FAIL, data: err.response.data });
  }
}

//사가함수
export function* AnswerSaga() {
  yield takeLatest(ANSWER_CREATE, insertAnswer);
  yield takeLatest(ANSWER_DELETE, deleteAnswer);
}

//초기상태
const initialBoard = {
  data: [],
  loading: false,
  success: false,
};

//reducer
const answer = (state = initialBoard, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case ANSWER_CREATE:
        draft.loading = true;
        break;
      case ANSWER_CREATE_SUCCESS:
        draft.data = action;
        draft.loading = false;
        draft.success = true;
        break;
      case ANSWER_CREATE_FAIL:
        draft.loading = false;
        break;
      case ANSWER_DELETE:
        draft.loading = true;
		draft.success = false;
        break;
      case ANSWER_DELETE_SUCCESS:
        draft.data = action;
        draft.loading = false;
        draft.success = true;
        break;
      case ANSWER_DELETE_FAIL:
        draft.loading = false;
		draft.success = false;
        break;
	  case ANSWER_SELECT:
		draft.loading = false;
		draft.success = false;
		break;
      default:
        return state;
    }
  });

export default answer;
