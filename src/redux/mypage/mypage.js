import axios from "axios";
import produce from "immer";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  MYPAGE_POST,
  MYPAGE_POST_FAIL,
  MYPAGE_POST_SUCCESS,
  MYPAGE_PWCHECK,
  MYPAGE_PWCHECK_CHANGE,
  MYPAGE_PWCHECK_CHANGE_SUCCESS,
  MYPAGE_PWCHECK_FAIL,
  MYPAGE_PWCHECK_SUCCESS,
  MYPAGE_UPDATE_MYINFO,
  MYPAGE_UPDATE_MYINFO_CHANGE,
  MYPAGE_UPDATE_MYINFO_CHANGE_SUCCESS,
  MYPAGE_UPDATE_SUCCESS,
} from "../actionType";
import { customAxios } from "../customAxios";

//action
export const mypageSelect = () => ({ type: MYPAGE_POST });
export const checkPw = (params) => ({ type: MYPAGE_PWCHECK, params });
export const changeCurrent = () => ({ type: MYPAGE_PWCHECK_CHANGE });
export const updateInfo = (params) => ({
  type: MYPAGE_UPDATE_MYINFO,
  params,
});

export const update_changeCurrent = () => ({
  type: MYPAGE_UPDATE_MYINFO_CHANGE,
});

//api
function mypageApi() {
  return customAxios("/mypage", "get");
}

function checkPwApi(params) {
  //console.log("pw>>>>>>>" + params);
  return customAxios("/mypage", "post", params);
}

function updateMyInfoApi(params) {
  return customAxios("/mypage", "put", params);
}

function* myPage() {
  try {
    const result = yield call(mypageApi); //일단 .data 제외
    yield put({ type: MYPAGE_POST_SUCCESS, data: result }); //put : 특성 액션을 디스패치
  } catch (err) {
    yield put({ type: MYPAGE_POST_FAIL, data: err });
  }
}

function* checkMyPW_Change() {
  try {
    yield put({ type: MYPAGE_PWCHECK_CHANGE_SUCCESS });
  } catch (error) {
    console.log(error);
  }
}

function* updateMyInfo_Change() {
  try {
    yield put({ type: MYPAGE_UPDATE_MYINFO_CHANGE_SUCCESS });
  } catch (error) {
    console.log(error);
  }
}

function* checkMyPw(action) {
  //console.log("action>>>>>" + JSON.stringify(action));
  try {
    const result = yield call(checkPwApi, action.params);
    //console.log("result" + result);
    yield put({ type: MYPAGE_PWCHECK_SUCCESS, data: result }); //put : 특성 액션을 디스패치
  } catch (err) {
    yield put({ type: MYPAGE_PWCHECK_FAIL, data: err.response.data });
  }
}

function* updateMyInfo(action) {
  try {
    //console.log("action.params" + JSON.stringify(action));
    const result = yield call(updateMyInfoApi, action.params);
    console.log("result >>> " + JSON.stringify(result));
    yield put({ type: MYPAGE_UPDATE_SUCCESS, data: result });
  } catch (error) {
    console.log(error);
  }
}
// function updateValue(action) {
// 	put({ type: UPDATE_VALUE, data: action.params });
// }

//사가함수
export function* MypageSaga() {
  yield takeLatest(MYPAGE_POST, myPage);
  yield takeLatest(MYPAGE_PWCHECK, checkMyPw);
  yield takeLatest(MYPAGE_PWCHECK_CHANGE, checkMyPW_Change);
  yield takeLatest(MYPAGE_UPDATE_MYINFO, updateMyInfo);
  yield takeLatest(MYPAGE_UPDATE_MYINFO_CHANGE, updateMyInfo_Change);
}

//초기상태
const initialBoard = {
  myInfo: {},
  myJoinList: [],
  myPost: [],
  data: [], //이번에 추가
  update: [],
  loading: false,
  success: false,
};

//reducer
const mypage = (state = initialBoard, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case MYPAGE_POST:
        draft.loading = true;
        break;
      case MYPAGE_POST_SUCCESS:
        draft.myInfo = action.data.MyInfo;
        draft.myJoinList = action.data.MyJoinList;
        draft.myPost = action.data.MyPost;
        draft.loading = false;
        draft.success = true;
        break;
      case MYPAGE_POST_FAIL:
        draft.loading = false;
        break;
      case MYPAGE_PWCHECK:
        //console.log("action>>>>>>" + action);
        draft.loading = true;
        break;
      case MYPAGE_PWCHECK_SUCCESS:
        //console.log("action>>>>>>" + JSON.stringify(action));
        draft.data = action.data;
        draft.loading = false;
        draft.success = true;
        break;
      case MYPAGE_PWCHECK_FAIL:
        draft.loading = false;
        break;
      case MYPAGE_PWCHECK_CHANGE_SUCCESS:
        draft.data = null;
        break;
      case MYPAGE_UPDATE_SUCCESS:
        //console.log("action >>> " + action);
        draft.update = true;
        draft.loading = false;
        draft.success = true;
        break;
      case MYPAGE_UPDATE_MYINFO_CHANGE_SUCCESS:
        draft.update = null;
        break;
      default:
        return state;
    }
  });

export default mypage;
