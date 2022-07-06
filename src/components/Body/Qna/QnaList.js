import { Stack } from "react-bootstrap";
import qna from "../../../redux/qna/qna";
import QnaListItem from "./QnaListItem";
import "./QnaListItem.css";
import { useSelector, useDispatch } from "react-redux";
import { qnaCreate, qnaSelect } from "../../../redux/qna/qna";
import { useEffect, useRef, useState } from "react";
import { answerSelect } from "../../../redux/qna/answer";
import QnaPagination from "./QnaPagination";

const QnaList = ({ chckId, board }) => {
  const qna = useSelector((state) => state.qna);
  const answer = useSelector((state) => state.answer);
  const dispatch = useDispatch();
  const [limit, setLimit] = useState(6);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

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
    <>
      <Stack gap={2}>
        {qna?.data.slice(offset, offset + limit).map((q) => (
          <>
            <QnaListItem qnaValue={q} key={q.id} checkId={chckId} board={board} />
          </>
        ))}
      </Stack>

      <QnaPagination
        total={qna.data.length}
        limit={limit}
        page={page}
        setPage={setPage} />
    </>
  );
};

export default QnaList;
