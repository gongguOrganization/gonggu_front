import { useCallback, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

import QnaInsert from "./QnaInsert";
import QnaList from "./QnaList";
import QnaTemplate from "./QnaTemplate";
import { qnaCreate, qnaSelect } from "../../../redux/qna/qna";
import { select } from "../../../redux/board/board";

const Qna = ({ checkId, board }) => {
  const question_id = localStorage.getItem("id");
  const dispatch = useDispatch();
  const [load, setLoad] = useState("");

  const onInsert = useCallback((question) => {
    dispatch(
      qnaCreate({
        boardId: checkId,
        questionId: question_id,
        question: question,
      }),
    );
    setLoad(question);
  }, []);

  return (
    <QnaTemplate>
      <QnaInsert onInsert={onInsert} />
      <QnaList chckId={checkId} board={board} load={load}/>
    </QnaTemplate>
  );
};

export default Qna;
