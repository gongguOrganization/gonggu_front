import { useEffect, useState } from "react";
import { Alert, Button, Col, Modal } from "react-bootstrap";
import { Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  changeCurrent,
  mypageSelect,
  update_changeCurrent,
} from "../../../redux/mypage/mypage";

import "./MyPage.scss";
import MyInfo from "./views/MyInfo";
import MyInfoDetail from "./views/MyInfoDetail";

const MyPage = () => {
  const [current, setCurrent] = useState("menu1");
  const [prev, setPrev] = useState(null);
  const [show, setShow] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const mypage = useSelector((state) => state.mypage);
  console.log("mypage >>> " + JSON.stringify(mypage));
  //console.log("updata >>>" + typeof mypage.update);
  console.log(mypage.update);
  useEffect(() => {
    dispatch(mypageSelect());
  }, []);

  useEffect(() => {
    setShow(true);
  }, [mypage]);

  // useEffect(() => {
  //   //console.log("current : ", current);
  //   if (current == 2) tempPage = mypage.myJoinList;
  //   else if (current == 3) tempPage = mypage.myPost;
  //   //console.log(tempPage);
  // }, [current]);

  useEffect(
    (e) => {
      if (current !== null) {
        document.getElementById(current).style.backgroundColor = "#f7f4e3";
        document.getElementById(current).style.fontWeight = "bold";
      }

      if (prev !== null) {
        document.getElementById(prev).style.backgroundColor = "#d2e1c8";
        document.getElementById(prev).style.fontWeight = "normal";
      }
      setPrev(current);
    },
    [current],
  );

  const onClickHandler = ({ target }) => {
    setCurrent(target.id);
    dispatch(changeCurrent());
    dispatch(update_changeCurrent());
  };

  return (
    <>
      <a href="/mypage" className="mpTitle">
        마이 페이지
      </a>
      <Container>
        <Row>
          <Col />
          <Col className="mpMenuBlock" id="menu1" onClick={onClickHandler}>
            나의 정보 수정
          </Col>
          <Col className="mpMenuBlock" id="menu2" onClick={onClickHandler}>
            공구 참여 현황
          </Col>
          <Col className="mpMenuBlock" id="menu3" onClick={onClickHandler}>
            나의 공구 모집
          </Col>
          <Col />
        </Row>
        <Row>
          <div className="mpFormBlock">
            {current !== "menu1" ? (
              <div className="mpListTitleBlock">
                <Row>
                  <Col xs={2}>순서</Col>
                  <Col xs={7}>제목</Col>
                  <Col xs={3}>진행 상태</Col>
                </Row>
              </div>
            ) : null}
            {current === "menu1" ? (
              <>
                <div
                  style={{
                    display: mypage.data === true ? "none" : "block",
                  }}
                >
                  <MyInfo data={mypage.myInfo.userId} />
                </div>
                {mypage.data === true ? (
                  <MyInfoDetail data={mypage.myInfo} />
                ) : mypage.data === false ? (
                  show ? (
                    <Alert
                      variant="danger"
                      onClose={() => {
                        setShow(false);
                      }}
                      dismissible
                      style={{
                        width: "70%",
                        margin: "0 auto",
                        marginTop: "30px",
                      }}
                    >
                      비밀번호가 틀렸습니다.
                    </Alert>
                  ) : null
                ) : null}
                {mypage.update == true ? (
                  <Alert
                    variant="success"
                    onClose={() => {
                      setShow(false);
                      setTimeout(() => {
                        window.location = "/";
                      }, 1000);
                    }}
                    dismissible
                    style={{
                      width: "70%",
                      margin: "0 auto",
                      marginTop: "30px",
                    }}
                  >
                    수정에 성공하였습니다🎉 닫기 버튼을 누르면{" "}
                    <span style={{ color: "#0d4212", fontWeight: "bold" }}>
                      1초
                    </span>{" "}
                    후 메인으로 이동합니다.
                  </Alert>
                ) : mypage.update == false && mypage.update.length !== 0 ? (
                  <Alert
                    variant="danger"
                    onClose={() => {
                      setShow(false);
                    }}
                    dismissible
                    style={{
                      width: "70%",
                      margin: "0 auto",
                      marginTop: "30px",
                    }}
                  >
                    수정에 실패하였습니다.
                  </Alert>
                ) : null}
              </>
            ) : current === "menu2" ? (
              mypage.myJoinList.map((val, idx) => (
                <div className="mpListBlock" key={idx}>
                  <Link className="mpPostTag" to={`/detail/${val.id}`}>
                    <Row>
                      <Col xs={2} style={{ fontWeight: "bold" }}>
                        {idx + 1}
                      </Col>
                      <Col xs={7} style={{ textAlign: "left" }}>
                        {val.title}
                      </Col>
                      {compareDate(
                        val.endDate,
                        val.currentCount,
                        val.maxCount,
                      ) ? (
                        <Col
                          xs={3}
                          style={{ color: "Royalblue", fontWeight: "bold" }}
                        >
                          진행중
                        </Col>
                      ) : (
                        <Col
                          xs={3}
                          style={{ color: "Crimson", fontWeight: "bold" }}
                        >
                          마감
                        </Col>
                      )}
                    </Row>
                  </Link>
                </div>
              ))
            ) : (
              mypage.myPost.map((val, idx) => (
                <div className="mpListBlock" key={idx}>
                  <Link className="mpPostTag" to={`/detail/${val.id}`}>
                    <Row>
                      <Col xs={2} style={{ fontWeight: "bold" }}>
                        {idx + 1}
                      </Col>
                      <Col xs={7} style={{ textAlign: "left" }}>
                        {val.title}
                      </Col>
                      {compareDate(
                        val.endDate,
                        val.currentCount,
                        val.maxCount,
                      ) ? (
                        <Col
                          xs={3}
                          style={{ color: "Royalblue", fontWeight: "bold" }}
                        >
                          진행중
                        </Col>
                      ) : (
                        <Col
                          xs={3}
                          style={{ color: "Crimson", fontWeight: "bold" }}
                        >
                          마감
                        </Col>
                      )}
                    </Row>
                  </Link>
                </div>
              ))
            )}
          </div>
        </Row>
      </Container>
    </>
  );
};

export default MyPage;

const makeZeroNumber = (number) => {
  if (Number(number) < 10) {
    return "0" + number;
  }
  return number;
};

const compareDate = (endDate, cCount, mCount) => {
  let now = new Date();
  let ingState = false;
  let nowDate =
    now.getFullYear() +
    "-" +
    makeZeroNumber(now.getMonth() + 1) +
    "-" +
    makeZeroNumber(now.getDate());

  if (nowDate <= endDate && cCount < mCount) {
    ingState = true;
  }
  return ingState;
};
