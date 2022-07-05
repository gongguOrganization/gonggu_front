import "./Header.css";
import { boardSelect } from "./../../redux/board/mainboard";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { current } from "immer";
import category, { categorySelect } from "./../../redux/category/category";
import { Button, Col, Row } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Collapse } from "bootstrap";

const Header = () => {
  const dispatch = useDispatch();
  const category = useSelector((state) => state.category);
  const login = useSelector((state) => state.login);

  const navigate = useNavigate();
  const id = localStorage.getItem("id");

  useEffect(() => {
    dispatch(categorySelect());
  }, []);

  const handleOnClick = (categoryId) => {
    dispatch(boardSelect({ categoryId: categoryId, title: "" }));
    document.getElementById("title").value = "";
  };

  const [currentClick, setCurrentClick] = React.useState(1);
  const [prevClick, setPrecClick] = React.useState(null);

  const GetClick = (e) => {
    setCurrentClick(e.target.id);
    console.log(e.target.id);
  };

  const onClickLogin = (e) => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  const onClickLogout = (e) => {};

  React.useEffect(
    (e) => {
      if (currentClick != null) {
        let current = document.getElementById(currentClick);
        current.style.color = "#F7F4E3";
        current.style.backgroundColor = "#0D4212";
      }

      if (prevClick !== null) {
        let prev = document.getElementById(prevClick);
        prev.style.color = "#0D4212";
        prev.style.backgroundColor = "#F7F4E3";
      }
      setPrecClick(currentClick);
    },
    [currentClick],
  );

  const goToMyPage = () => {
	navigate("/mypage");
  }

  const goToWritePage = () => {
	navigate("/write");
  }

  return (
    <Container fluid>
      <Row className="Header">
        <Col></Col>
        <Col>
          <Link to="/">
            <img className="Header-logo" src="/images/logo.png" alt="logo" />
          </Link>
        </Col>
        <Col>
          <Row className="Header-right">
            {/* 로그인 되었을 때 */}

            {login.isLoggedIn ? (
              <div>
                  <span className="menu-tag" onClick={goToWritePage}>
					<span>공구 모집 글쓰기</span>
                  </span>
                  <span className="menu-tag" onClick={goToMyPage}>
					<span>마이페이지</span>
                    {/* <div className="Menu-select-box">
                      <ul>
                        <li>
                          <a href="/">나의 정보 수정</a>
                        </li>
                        <li>
                          <a href="/">공구 참여 현황</a>
                        </li>
                        <li>
                          <a href="/">나의 공구 모집</a>
                        </li>
                      </ul>
                    </div> */}
                  </span>
                  <span className="menu-tag" onClick={onClickLogin}>
                    <span>로그아웃</span>
                  </span>
              </div>
            ) : (
              <div>
                <Col xs={4}></Col>
                <a href="/login">로그인</a>

                <Col xs={6}></Col>
              </div>
            )}
          </Row>
        </Col>
      </Row>
      <Row className="Header-category">
        <Col />

        <Col xs={7} style={{}}>
          <span onClick={GetClick}>
            <button
              className="Header-button Header-button-clicked"
              onClick={() => handleOnClick()}
              id="1"
            >
              전체
            </button>
          </span>
          {category.data.map((c, idx) => (
            <span onClick={GetClick}>
              <button
                className="Header-button Header-button-clicked"
                onClick={() => handleOnClick(idx + 1)}
                id={idx + 2}
              >
                {c.name}
              </button>
            </span>
          ))}
        </Col>
        <Col />
      </Row>
      <Row className="Header-line">
        <hr style={{ color: "#0D4212" }} />
      </Row>
    </Container>
  );
};

export default Header;
