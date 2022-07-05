import { takeLatest } from "redux-saga/effects";
import produce from "immer";
import {
  CREATE,
  CREATE_SUCCESS,
  CREATE_FAIL,
  UPDATE_VALUE,
  READ_VALUE,
  READ_SUCCESS,
  UPDATE,
  UPDATE_SUCCESS,
  UPDATE_FAIL,
  INIT
} from "./actionType";
import { postBoard, updateValue, selectValue, updateBoard } from "./boardApi";

//액션 함수
export const create = (params) => ({ type: CREATE, params });
export const update = (params) => ({ type: UPDATE_VALUE, params });
export const select = (id) => ({ type: READ_VALUE, id });
export const updateData = (params) => ({ type: UPDATE, params });
export const init = () => ({ type: INIT })

//사가함수
export function* BoardSaga() {
  yield takeLatest(CREATE, postBoard);
  yield takeLatest(UPDATE_VALUE, updateValue);
  yield takeLatest(READ_VALUE, selectValue);
  yield takeLatest(UPDATE, updateBoard);
}

//초기상태
const initialBoard = {
  data: new FormData(),
  loading: false,
  success: false,
  enableAccess: false
};

//reducer
const board = (state = initialBoard, action) =>
  produce(state, (draft) => {
    switch (action.type) {
	  case INIT:
		draft.loading = false;
		draft.success = false;
		draft.data = new FormData();
		break;
      case CREATE:
        draft.loading = true;
		draft.success = false;
        break;
      case CREATE_SUCCESS:
        draft.data.set("id", action.id);
        draft.loading = false;
        draft.success = true;
        break;
      case CREATE_FAIL:
		draft.success = false;
        draft.loading = false;
        break;
      case UPDATE_VALUE:
        draft.data.set(action.params.id, action.params.value);
        break;
      case READ_SUCCESS:
		draft.success = false;
        draft.loading = false;
        const data = new FormData();
        for (let key in action.data) {
          data.set(key, action.data[key]);
        }
        draft.data = data;
        break;
      case UPDATE_SUCCESS:
		draft.loading = false;
		draft.success = true;
        break;
      case UPDATE_FAIL:
		draft.loading = false;
		draft.success = true;;
        break;
      default:
        return state;
    }
  });

export default board;
