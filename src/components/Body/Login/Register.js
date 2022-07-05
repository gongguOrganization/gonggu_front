import "./Login.css";
import { Button, Form, Input } from "reactstrap";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DaumPostcode from "react-daum-postcode";
import { useNavigate } from "react-router-dom";
import { create } from "../../../redux/login/login";

const Register = () => {
  const dispatch = useDispatch();
  const joinReducer = useSelector((state) => state.login);

  const [user, setUser] = useState({
    userId: "",
    password: "",
    name: "",
    postcode: "",
    address1: "",
    address2: "",
    address3: "",
    tel: "",
    bank: "",
    bankaccount: "",
  });

  const onChangeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
	console.log(user);
  };

  const onChangeHandlerPw = (e) => {
    console.log(e.target.value, user.password);
    if (e.target.value == user.password) {
      setIsPwSame(true);
      setUser({ ...user, [e.target.name]: e.target.value });
    } else {
      setIsPwSame(false);
    }
  };

  const [isAddress, setIsAddress] = useState("");
  const [isAddress1, setIsAddress1] = useState("");

  const [isZoneCode, setIsZoneCode] = useState("");
  const [isPostOpen, setIsPostOpen] = useState(false);
  const [isPwSame, setIsPwSame] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (joinReducer.isSignedUp) {
      navigate("/login");
    }
  }, [joinReducer]);

  const onClickHandler = () => {
    setIsPostOpen(true);
  };
  const execDaumPostcode = (data) => {
    let addr = "";
    let extraAddress = "";

    if (data.addressType === "R") {
      // 사용자가 도로명 주소를 선택했을 경우
      addr = data.roadAddress;
    } else {
      // 사용자가 지번 주소를 선택했을 경우(J)
      addr = data.jibunAddress;
    }

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      addr += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    setIsZoneCode(data.zonecode);
    setIsAddress(addr);
    setIsAddress1(extraAddress);
    setIsPostOpen(false);
  };

  const onSubmitJoin = (e) => {
    e.preventDefault();
    dispatch(
      create({
        userId: user.userId,
        password: user.password,
        name: user.name,
        postcode: isZoneCode,
        address1: isAddress,
        address2: user.address2,
        address3: isAddress1,
        tel: user.tel,
        bank: user.bank,
        bankaccount: user.bankaccount,
      }),
    );
  };

  const postCodeStyle = {
    display: "block",
    position: "absolute",
    top: "50%",
    width: "400px",
    height: "500px",
    padding: "7px",
  };
  return (
    <div className="body">
      <div className="form-box">
        <div className="register">
          <div>
            <img src="images/logo.png" alt="Logo"></img>
          </div>
          <div>
            <h1>REGISTER</h1>

            <Form className="JoinForm" onSubmit={(e) => onSubmitJoin(e)}>
              <Input
                placeholder="  ID"
                name="userId"
                onChange={(e) => onChangeHandler(e)}
              ></Input>
              <br />
              <Input
                type="password"
                placeholder="  password"
                name="password"
                onChange={(e) => onChangeHandler(e)}
              ></Input>
              <br />
              {isPwSame ? (
                <div>
                  <p
                    style={{
                      fontSize: "10px",
                      marginLeft: "73%",
                      float: "left",
                      color: "#1E4119",
                    }}
                  >
                    {" "}
                    비밀번호가 일치합니다.
                  </p>
                </div>
              ) : (
                <div>
                  <p
                    style={{
                      fontSize: "10px",
                      marginLeft: "66%",
                      float: "left",
                      color: "red",
                    }}
                  >
                    {" "}
                    비밀번호가 일치하지않습니다.
                  </p>
                </div>
              )}
              <Input
                type="password"
                placeholder="  password"
                name="password2"
                onChange={(e) => onChangeHandlerPw(e)}
              ></Input>
              <br />
              <Input
                placeholder="  Name"
                name="name"
                onChange={(e) => onChangeHandler(e)}
              ></Input>
              <br />
              <div>
                <Input
                  className="post"
                  type="text"
                  id="sample6_postcode"
                  name="postcode"
                  placeholder="  우편번호"
                  value={isZoneCode}
                  onChange={(e) => onChangeHandler(e)}
                />
                <Input
                  type="button"
                  className="postclick"
                  value="우편번호 찾기"
                  onClick={() => onClickHandler()}
                />
                {isPostOpen ? (
                  <div>
                    <DaumPostcode
                      style={postCodeStyle}
                      autoClose
                      onComplete={(address) => execDaumPostcode(address)}
                    />
                  </div>
                ) : null}
              </div>
              <Input
                type="text"
                id="sample6_address"
                placeholder="  주소"
                name="address1"
                value={isAddress}
                onChange={(e) => onChangeHandler(e)}
              />
              <br />
              <Input
                className="post"
                type="text"
                id="sample6_detailAddress"
                placeholder="  상세주소"
                name="address2"
                onChange={(e) => onChangeHandler(e)}
              />
              <Input
                style={{ marginLeft: "4%" }}
                className="post"
                type="text"
                id="sample6_extraAddress"
                name="address3"
                placeholder="  참고항목"
                value={isAddress1}
                onChange={(e) => onChangeHandler(e)}
              />
              <Input
                placeholder="  Tel"
                name="tel"
                onChange={(e) => onChangeHandler(e)}
              ></Input>
              <br />
              <select
                style={{ width: "30%", float: "left" }}
                name="bank"
                onChange={(e) => onChangeHandler(e)}
              >
                <option name="bank" value="none">
                  Bank
                </option>
                <option name="bank" value="카카오">
                  카카오뱅크
                </option>
                <option name="bank" value="kb">
                  국민은행
                </option>
                <option name="bank" value="dg">
                  대구은행
                </option>
              </select>
              <Input
                style={{ float: "left", width: "66%", marginLeft: "4%" }}
                placeholder="  Account"
                name="bankaccount"
                onChange={(e) => onChangeHandler(e)}
              ></Input>
              <br />

              <Button
                className="LoginButton"
                type="submit"
                color="primary"
                block={true}
              >
                SUBMIT
              </Button>
            </Form>
            <p>
              <a href="/Login">Go to Login</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
