import { takeLatest, takeEvery, call, put } from "redux-saga/effects";
import produce from "immer";
import {
  QNA_CREATE,
  QNA_CREATE_SUCCESS,
  QNA_CREATE_FAIL,
  QNA_SELECT,
  QNA_SELECT_SUCCESS,
  QNA_SELECT_FAIL,
  QNA_UPDATE,
  QNA_UPDATE_SUCCESS,
  QNA_UPDATE_FAIL
} from "./actionType";
import { insertQnaApi, selectQnaApi, updateQnaApi } from "./qnaAndAnswerApi";

//액션 함수
export const qnaCreate = (params) => ({ type: QNA_CREATE, params });
export const qnaSelect = () => ({ type: QNA_SELECT });
export const qnaUpdate = (params) => ({ type: QNA_UPDATE, params });

function* insertQna(action) {
  try {
    const result = yield call(insertQnaApi, action.params);
    yield put({ type: QNA_CREATE_SUCCESS, data: result.data }); //put : 특성 액션을 디스패치
  } catch (err) {
    yield put({ type: QNA_CREATE_FAIL, data: err.response.data });
  }
}

function* selectQna() {
  try {
    const result = yield call(selectQnaApi);
    yield put({ type: QNA_SELECT_SUCCESS, data: result.data }); //put : 특성 액션을 디스패치
  } catch (err) {
    yield put({ type: QNA_SELECT_FAIL, data: err.response.data });
  }
}
function* updateQna(action) {
  try {
    const result = yield call(updateQnaApi, action.params);
    yield put({ type: QNA_UPDATE_SUCCESS, data: result.data }); //put : 특성 액션을 디스패치
  } catch (err) {
    yield put({ type: QNA_UPDATE_FAIL, data: err.response.data });
  }
}

//사가함수
export function* QnaSaga() {
  yield takeLatest(QNA_CREATE, insertQna);
  yield takeLatest(QNA_SELECT, selectQna);
  yield takeLatest(QNA_UPDATE, updateQna);
}

//초기상태
const initialBoard = {
  data: [],
  loading: false,
  success: false,
};

//reducer
const qna = (state = initialBoard, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case QNA_CREATE:
        draft.loading = true;
        break;
      case QNA_CREATE_SUCCESS:
        draft.data = action;
        draft.loading = false;
        draft.success = true;
        break;
      case QNA_CREATE_FAIL:
        draft.loading = false;
        break;
      case QNA_UPDATE:
        draft.loading = true;
        break;
      case QNA_UPDATE_SUCCESS:
        draft.data = action.data;
        draft.loading = false;
        draft.success = true;
        break;
      case QNA_UPDATE_FAIL:
        draft.loading = false;
        break;
      case QNA_SELECT:
        draft.loading = true;
        break;
      case QNA_SELECT_SUCCESS:
        draft.data = action.data;
        draft.loading = true;
        draft.success = true;
        break;
      case QNA_SELECT_FAIL:
        draft.loading = false;
        break;
      default:
        return state;
    }
  });

export default qna;
