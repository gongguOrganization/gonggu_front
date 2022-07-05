import { combineReducers } from "redux";
import board, { BoardSaga } from "./board/board";
import { all } from "redux-saga/effects";
import qna, { QnaSaga } from "./qna/qna";
import answer, { AnswerSaga } from "./qna/answer";
import login, { LoginSaga } from "./login/login";

import mainboard, { PostSaga } from "./board/mainboard";
import category, { CategorySaga } from "./category/category";

import participation, { PartSaga } from "./participation/participation";
import checkLogin, { UserCheckSaga } from "./user/user";
import bankAccount, { BankAccountSaga } from "./user/bankAccount";
import mypage, { MypageSaga } from "./mypage/mypage";

// 여러 상태값을 변경하는 리듀서들을 하나의 리듀서 함수로 합친다.
const rootReducer = combineReducers({
  board,
  mainboard,
  category,
  login,
  qna,
  answer,
  participation,
  checkLogin,
  bankAccount,
  mypage,
});

// 여러 사가함수들을 연결해 주어 사가 함수가 액션을 인식할 수 있게 해준다.
export function* rootSaga() {
  yield all([
    BoardSaga(),
    PostSaga(),
    CategorySaga(),
    LoginSaga(),
    QnaSaga(),
    AnswerSaga(),
    PartSaga(),
    UserCheckSaga(),
    BankAccountSaga(),
    MypageSaga(),
  ]); // all : 함수 내부 배열에 등록 된 사가 함수들을 리덕스 사가 미들웨어에 등록, 등록된 함수가 동시에 실행될 수 있게 처리
}
export default rootReducer;
