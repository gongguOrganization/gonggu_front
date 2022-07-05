import { useEffect, useState } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Input } from "reactstrap";
import { checkPw } from "../../../../redux/mypage/mypage";

const MyInfo = ({ data, count }) => {
  //const navigate = useNavigate();
  //const [fail, setFail] = useState(false);
  const dispatch = useDispatch();
  //const checkMyPw = useSelector((state) => state.mypage);

  //console.log("checkMyPW >>> " + JSON.stringify(checkMyPw));
  const [pwType, setPwType] = useState({
    type: "password",
    visible: false,
  });

  //const [isFail, setIsFail] = useState(false);
  // const [user, setUser] = useState({
  //   password: "",
  // });

  const handlePwType = (e) => {
    setPwType(() => {
      if (!pwType.visible) {
        return { type: "text", visible: true };
      }
      return { type: "password", visible: false };
    });
  };

  const onSubmitPwCheck = () => {
    //e.preventDefault();
    //console.log("여긴 타니?");
    //console.log(document.getElementById("password").value);
    dispatch(checkPw({ password: document.getElementById("password").value }));
  };

  // const onChangeHandler = (e) => {
  //   const { value } = e.target;
  //   console.log("value>>> " + value);
  //   setUser({ ...user, password: value });
  // };

  // const closeAlert = () => {
  //   setIsFail(false);
  // };

  return (
    <>
      <Form className="infoFormAlign">
        {/*onSubmit={(e) => onSubmitPwCheck(e)} */}
        <Row className="mpSubTitle" style={{ marginTop: "20px" }}>
          <span>{data}님의 개인정보를 안전하게 보호하기 위해</span>
          <p>
            <span style={{ color: "red", fontWeight: "bolder" }}>
              비밀번호 인증 후 정보 변경이 가능
            </span>
            합니다.
          </p>
        </Row>

        {/* {isFail ? (
          <Alert color="warning" toggle={() => closeAlert()}>
            비밀번호가 일치하지 않습니다.
          </Alert>
        ) : null} */}
        <div className="input-group" style={{ width: "50%", margin: "0 auto" }}>
          <Input
            type={pwType.type}
            className="form-control"
            id="password"
            // onChange={(e) => onChangeHandler(e)}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-success"
              type="button"
              onClick={handlePwType}
            >
              {pwType.visible ? "숨기기" : "비밀번호 보기"}
            </button>
          </div>
        </div>

        <Button
          variant="success"
          type="button"
          onClick={(e) => onSubmitPwCheck(e)}
          style={{ marginTop: "20px", width: "50%" }}
        >
          확인
        </Button>
      </Form>
    </>
  );
};

export default MyInfo;
