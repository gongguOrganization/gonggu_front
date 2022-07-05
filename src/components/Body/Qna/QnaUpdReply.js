import { useCallback, useEffect, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { qnaSelect, qnaUpdate } from "../../../redux/qna/qna";

const QnaUpdReply = ({ index, answer }) => {
  const [value, setValue] = useState("");
  const [visible, setVisible] = useState(false);
  const qna = useSelector((state) => state.qna);
	const navigate = useNavigate();
	const { id } = useParams();

  const dispatch = useDispatch();
  

  const onChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  const handleUpdSubmit = () => {
    console.log(value.trim());
    if (value.trim() !== ''){
      dispatch(qnaUpdate({ id: index, question: value }));
      alert("수정 되었습니다.");
      // navigate(`/detail/${id}`);
      dispatch(qnaSelect());
    } else{
      alert("빈값 입력 했다");
    }
  };
  
  return (
    <>
      {visible ? (
        null
      ) : (
        <Form className="qnaUpdate" onSubmit={handleUpdSubmit}>
          <InputGroup className="mb-3">
            <Form.Control
              rows={1}
              id={index}
              placeholder="답변 입력"
              aria-label="qna update form"
              aria-describedby="basic-addon2"
              onChange={onChange}
            />
            <Button type="submit" variant="outline-secondary" id="answerSubmit">
              저장
            </Button>
          </InputGroup>
        </Form>
      )}
    </>
  );
};

export default QnaUpdReply;
