import { useEffect, useState } from "react";
import { Button, Col, Form, FormSelect, Row } from "react-bootstrap";
import { Input } from "reactstrap";
import DaumPostcode from "react-daum-postcode";
import { useDaumPostcodePopup } from "react-daum-postcode";
import styled from "styled-components";
import "../MyPage.scss";
import { useDispatch, useSelector } from "react-redux";
import { updateInfo, updateMyInfo } from "../../../../redux/mypage/mypage";

const Modal = styled.div`
  margin-top: 470px !important;
  margin-left: 68% !important;

  width: 400px !important;
  height: 405px !important;

  z-index: 200;
  position: absolute;
  top: 0px;
  right: 0px;
  left: 0px;
  bottom: 0px;
  margin: auto;
  padding: 2px;
  border: 1px solid black;
`;

const MyInfoDetail = ({ data, isUpdate }) => {
  //console.log("isUpdate" + isUpdate);
  const [postCode, setPostCode] = useState(`${data.postcode}`);
  const [address1, setAddress1] = useState(`${data.address1}`);
  const [address2, setAddress2] = useState(`${data.address2}`);
  const [address3, setAddress3] = useState(`${data.address3}`);
  const [selected, setSelected] = useState(`${data.bank}`);
  //console.log("data >>> " + JSON.stringify(data));
  const [isPostOpen, setIsPostOpen] = useState(false);

  const OPTIONS = [
    { value: "NH", name: "NH농협" },
    { value: "국민", name: "국민은행" },
    { value: "신한", name: "신한은행" },
    { value: "우리은행", name: "우리은행" },
    { value: "카카오", name: "카카오뱅크" },
    { value: "대구", name: "대구은행" },
  ];

  const [user, setUser] = useState({
    // userId: "",
    // password: "",
    name: "",
    postcode: "",
    address1: "",
    address2: "",
    address3: "",
    tel: "",
    bank: "",
    bankaccount: "",
  });

  const [visible, setVisible] = useState(true);

  const dispatch = useDispatch();

  const DaumPost = ({}) => {
    const handleComplete = (data) => {
      let fullAddress = data.address;
      let extraAddress = "";
      if (data.addressType === "R") {
        if (data.bname !== "") {
          extraAddress += data.bname;
        }
        if (data.buildingName !== "") {
          extraAddress +=
            extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
        }
        fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
      }
      setPostCode(data.zonecode);
      setAddress1(fullAddress);
      setAddress3(extraAddress);
      //setAddress3(""); 왜 작동안할까...
      setIsPostOpen(false);
    };

    return (
      <div style={{ display: visible ? "block" : "none" }}>
        <Modal style={{ backgroundColor: "white" }}>
          <Button
            variant="outline-dark"
            size="sm"
            style={{ float: "left" }}
            onClick={() => setVisible(false)}
          >
            창 종료
          </Button>
          <DaumPostcode
            onComplete={handleComplete}
            style={{ overflow: "hidden", height: "368px" }}
            autoClose
          />
        </Modal>
      </div>
    );
  };

  const onClickHandler = () => {
    setIsPostOpen(true);
    setVisible(true);
  };

  const onChangeHandler = (e) => {
    console.log("e >>> " + e.target);
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log("user >>> " + JSON.stringify(user));
  };

  const onSubmitMyInfo = (e) => {
    e.preventDefault();
    console.log("여긴 타니..?");
    console.log("여기서 data " + JSON.stringify(data));

    dispatch(
      updateInfo({
        userId: data.userId,
        name: document.getElementById("name").value,
        postcode: document.getElementById("sample6_postcode").value,
        address1: document.getElementById("sample6_address").value,
        address2: document.getElementById("sample6_detailAddress").value,
        address3: document.getElementById("sample6_extraAddress").value,
        tel: document.getElementById("tel").value,
        bank: document.getElementById("bank").value,
        bankaccount: document.getElementById("bankaccount").value,
      }),
    );
  };

  // const updateReducer = useSelector((state) => state.update);
  // console.log("updateReducer >>> " + updateReducer);

  return (
    <>
      <div className="infoTitle" style={{ marginTop: "10px" }}>
        <span style={{ color: "Teal" }}>🤍{data.userId}🤍</span>님의 정보 수정
      </div>
      <Form onSubmit={(e) => onSubmitMyInfo(e)}>
        <Row>
          <Col xs={4} className="detail label">
            이름
          </Col>
          <Col xs={6} className="detail">
            <Input
              type="text"
              id="name"
              placeholder="name"
              defaultValue={`${data.name}`}
              //onChange={(e) => onChangeHandler(e)}
            ></Input>
          </Col>
          <Col xs={2} />
        </Row>
        <Row>
          <Col xs={4} className="detail label">
            주소
          </Col>
          <Col xs={3} className="detail">
            <Input
              type="text"
              id="sample6_postcode"
              name="postcode"
              placeholder="zoncode"
              value={postCode}
              onChange={(e) => onChangeHandler(e)}
              style={{ backgroundColor: "#e9ecef" }}
            ></Input>
          </Col>
          <Col xs={3}>
            <Button
              variant="success"
              style={{ marginTop: "3px", width: "100%" }}
              onClick={onClickHandler}
            >
              Search
            </Button>
            {isPostOpen ? <DaumPost /> : null}
          </Col>
          <Col xs={2} />
        </Row>
        <Row>
          <Col xs={4} />
          <Col xs={6} className="detail">
            <Input
              type="text"
              id="sample6_address"
              name="address1"
              placeholder="address1"
              value={address1}
              onChange={(e) => onChangeHandler(e)}
              style={{ backgroundColor: "#e9ecef" }}
            ></Input>
          </Col>
          <Col xs={2} />
        </Row>
        <Row>
          <Col xs={4} />
          <Col xs={4} className="detail">
            <Input
              type="text"
              id="sample6_detailAddress"
              name="address2"
              placeholder="address2"
              defaultValue={address2}
              onChange={(e) => onChangeHandler(e)}
              //style={{ backgroundColor: "#e9ecef" }}
            ></Input>
          </Col>
          <Col xs={2} className="detail">
            <Input
              type="text"
              id="sample6_extraAddress"
              name="address3"
              placeholder="etc"
              value={address3}
              onChange={(e) => onChangeHandler(e)}
              style={{ backgroundColor: "#e9ecef" }}
            ></Input>
          </Col>
          <Col xs={2} />
        </Row>
        <Row>
          <Col xs={4} className="detail label">
            전화번호
          </Col>
          <Col xs={6} className="detail">
            <Input
              type="text"
              id="tel"
              placeholder="phone number"
              defaultValue={`${data.tel}`}
            ></Input>
          </Col>
          <Col xs={2} />
        </Row>
        <Row>
          <Col xs={4} className="detail label">
            계좌번호
          </Col>
          <Col xs={2} className="detail">
            <BankSelect options={OPTIONS} defaultValue={selected} />
          </Col>
          <Col xs={4} className="detail">
            <Input
              type="text"
              id="bankaccount"
              placeholder="bank account"
              defaultValue={`${data.bankaccount}`}
            ></Input>
          </Col>
          <Col xs={2} />
        </Row>
        <Row>
          <Col xs={4} />
          <Col xs={6}>
            <Button
              variant="success"
              style={{ width: "100%", marginTop: "10px" }}
              type="submit"
            >
              💾 수정 완료
            </Button>
          </Col>
          <Col xs={2} />
        </Row>
      </Form>
    </>
  );
};

export default MyInfoDetail;

const BankSelect = (props) => {
  //console.log("props>>> " + JSON.stringify(props));
  return (
    <FormSelect id="bank" defaultValue={props.defaultValue}>
      <option name="bank_title" disabled>
        Bank
      </option>
      {props.options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </FormSelect>
  );
};
