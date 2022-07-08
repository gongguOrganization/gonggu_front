import axios from "axios";
import { takeLatest, call, put } from "redux-saga/effects";
import {
  CATEGORY_POST,
  CATEGORY_POST_FAIL,
  CATEGORY_POST_SUCCESS,
} from "./actionType";
import produce from "immer";

export const categorySelect = () => ({ type: CATEGORY_POST });

//api
function categoryApi() {
  return axios.get("http://localhost:8000/board-service/category");
}

function* categoryAction(action) {
  try {
    const result = yield call(categoryApi);
    yield put({ type: CATEGORY_POST_SUCCESS, data: result.data }); //put : 특성 액션을 디스패치
  } catch (err) {
    yield put({ type: CATEGORY_POST_FAIL, data: err.response.data });
  }
}

export function* CategorySaga() {
  yield takeLatest(CATEGORY_POST, categoryAction);
}

const initialBoard = {
  data: [],
  loading: false,
  success: false,
};

const category = (state = initialBoard, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case CATEGORY_POST:
        draft.loading = true;
        break;
      case CATEGORY_POST_SUCCESS:
		console.log(action);
        draft.data = action.data;
        draft.loading = false;
        draft.success = true;
        break;
      case CATEGORY_POST_FAIL:
        draft.loading = false;
        break;
      default:
        return state;
    }
  });

export default category;
