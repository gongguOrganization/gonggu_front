import "./Login.css";
import { Alert, Button, Form, Input } from "reactstrap";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { select } from "../../../redux/login/login";
const Login = () => {
  const dispatch = useDispatch();

  const loginRedux = useSelector((state) => state.login);

  const [isFail, setIsFail] = useState(false);
  const [user, setUser] = useState({
    userId: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (loginRedux.isLoggedIn) {
      localStorage.setItem("id", loginRedux.data.id);
      localStorage.setItem("token", loginRedux.data.token);

      navigate("/");
    }
  }, [loginRedux]);

  const onSubmitLogin = (e) => {
    e.preventDefault();
    dispatch(select({ userId: user.userId, password: user.password }));
  };

  const closeAlert = () => {
    setIsFail(false);
  };

  return (
    <div className="body">
      <div className="form-box">
        <div className="login">
          <div>
            <img src="images/logo.png" alt="Logo"></img>
          </div>
          <div>
            <h1>LOGIN</h1>
            <Form onSubmit={(e) => onSubmitLogin(e)} className="LoginForm">
              {isFail ? (
                <Alert color="warning" toggle={() => closeAlert()}>
                  아이디 또는 비밀번호가 틀렸습니다.
                </Alert>
              ) : null}
              <Input
                className="LoginInput"
                placeholder="  ID"
                name="userId"
                id="userId"
                onChange={(e) => onChangeHandler(e)}
              ></Input>
              <br />
              <Input
                className="LoginInput"
                type="password"
                placeholder="  password"
                name="password"
                id="password"
                onChange={(e) => onChangeHandler(e)}
              ></Input>
              <br />
              <Input id="terms" type="checkbox" />
              <label htmlFor="terms"></label>
              <span>remember ID</span>
              <Button className="LoginButton" type="submit" color="primary">
                Login
              </Button>
            </Form>
            <p>
              <a href="/Register">Go to register</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
