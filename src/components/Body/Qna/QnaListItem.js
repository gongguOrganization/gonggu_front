import React, { useState, useEffect } from "react";
import QnaReply from "./QnaReply";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { answerDelete } from "../../../redux/qna/answer";
import { useNavigate, useParams } from "react-router-dom";
import { InputGroup } from "reactstrap";
import QnaUpdReply from "./QnaUpdReply";

const QnaListItem = ({ qnaValue, checkId, board }) => {
  const { id, boardId, questionId, question, answer } = qnaValue;

  const [visible, setVisible] = useState(false);
  const [updstate, setUpdstate] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    dispatch(answerDelete({ id: id }));
    alert("삭제 되었습니다.");
  };
  
  const nowId = localStorage.getItem("id");
  return boardId === parseInt(checkId) ? (
    <>
      <div className="question_content">
        {updstate === true ? <QnaUpdReply index={id} /> : question}

          {/* 글 작성자와 현재 유저 비교 */}
          {board.data.get("userId") === nowId ? (
            <>
              <Button
                type="button"
                className="answerBtn"
                variant="success"
                onClick={() => {
                  setVisible(!visible);
                }}
              >
                답변
              </Button>
            </>
          ) : // 댓글 작성자만 자기가 쓴 댓글 수정 가능
        questionId === parseInt(nowId) ? (
          updstate === false ? (
            <Button
              type="button"
              className="answerBtn"
              variant="success"
              onClick={() => {
                setUpdstate(!updstate);
              }}
            >
              수정
            </Button>
          ) : null
        ) : null}
      </div>
      {/* 댓글이 없으면 댓글 작성창 띄우기 */}
      {answer === null ? (
        <div className="hide_answer_form">
          {visible && <QnaReply index={id} setUpdstate={setUpdstate} />}
        </div>
      ) : (
        <div className="answer_content">
          {answer}
          <Button
            type="button"
            variant="success"
            className="answerBtn"
            onClick={handleSubmit}
          >
            삭제
          </Button>
        </div>
      )}
    </>
  ) : null;
};

export default QnaListItem;
