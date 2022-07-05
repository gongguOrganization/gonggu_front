import { useCallback, useRef, useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Detail from "./Info";
import "./Detail.css";
import JoinList from "./Modal/JoinList";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { init, select } from "../../../redux/board/board";
import Qna from "../Qna/Qna";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const { id } = useParams();

  const bucket = "imagestore-39fb6.appspot.com";

  const board = useSelector((state) => state.board);
  const participation = useSelector((state) => state.participation);

  useEffect(() => {
    dispatch(select(id));
  }, [participation]);

  useEffect(() => {
    if (board.success) {
      if (!board.data.has("id")) {
		dispatch(init());
        navigate("/");
		alert("잘못된 접근입니다.");
      }
    }
  }, [board]);

  return (
    <>
      <Container>
        {/* 내용 작성 */}
        <Row>
          <Col xs={2} />
          <Col xs={4}>
            <div className="Detail-img-div" style={{ height: "400px", width: "400px" }}>
              {board.data.get("img") ? (
                <img
                  style={{ height: "400px", width: "400px", objectFit: "contain" }}
                  className="Detail-img"
                  alt="img"
				  onError={(e)=>{e.target.onerror = null; e.target.src="/images/logo.png"}}
                  src={`https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${board.data.get(
                    "img",
                  )}?alt=media`}
                />
              ) : null}
            </div>
          </Col>
          <Col xs={4}>
            <Detail setShow={setShow} boardId={id} board={board} />
          </Col>
          <Col xs={2} />
        </Row>
        <Row>
          <Col xs={2} />
          <Col>
            <hr />
            <div
              dangerouslySetInnerHTML={{ __html: board.data.get("content") }}
            />
          </Col>
          <Col xs={2} />
        </Row>
      </Container>
      <JoinList show={show} setShow={setShow} boardId={id} />
      <Qna checkId={id} board={board} />
    </>
  );
};

export default Body;
