import axios from "axios";
import { takeLatest, call, put } from "redux-saga/effects";
import { BOARD_POST, BOARD_POST_FAIL, BOARD_POST_SUCCESS } from "./actionType";
import produce from "immer";

export const boardSelect = (params) => ({ type: BOARD_POST, params });

//api
function mainBoardApi(params) {
  return axios.get("http://localhost:8080/board", { params });
}

function* mainBoard(action) {
  try {
    const result = yield call(mainBoardApi, action.params);
    yield put({ type: BOARD_POST_SUCCESS, data: result.data }); //put : 특성 액션을 디스패치
  } catch (err) {
    yield put({ type: BOARD_POST_FAIL, data: err.response.data });
  }
}

export function* PostSaga() {
  yield takeLatest(BOARD_POST, mainBoard);
}

const initialBoard = {
  data: [],
  loading: false,
  success: false,
};

const mainboard = (state = initialBoard, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case BOARD_POST:
        draft.loading = true;
        break;
      case BOARD_POST_SUCCESS:
        console.log(action);
        draft.data = action.data;
        draft.loading = false;
        draft.success = true;
        break;
      case BOARD_POST_FAIL:
        draft.loading = false;
        break;
      default:
        return state;
    }
  });

export default mainboard;
