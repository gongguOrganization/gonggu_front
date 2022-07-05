import { Stack } from "react-bootstrap";
import qna from "../../../redux/qna/qna";
import QnaListItem from "./QnaListItem";
import "./QnaListItem.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import QnaInsert from "./QnaInsert";
import QnaTemplate from "./QnaTemplate";
import { qnaCreate, qnaSelect } from "../../../redux/qna/qna";
import { useEffect, useRef, useState } from "react";
import QnaReply from "./QnaReply";
import { answerSelect } from "../../../redux/qna/answer";

const QnaList = ({ chckId, board, load }) => {
  const qna = useSelector((state) => state.qna);
  const answer = useSelector((state) => state.answer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(qnaSelect());
  }, []);

  useEffect(() => {
    if((!qna.loading && qna.success) || (!answer.loading && answer.success)) {
        dispatch(qnaSelect());
        dispatch(answerSelect());
    }
  }, [qna, answer]);
  

  return (
    <Stack gap={2}>
      {qna?.data.map((q) => (
        <>
          <QnaListItem qnaValue={q} key={q.id} checkId={chckId} board={board} />
        </>
      ))}
    </Stack>
  );
};

export default QnaList;
