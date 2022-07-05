import { useCallback, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { answerCreate } from "../../../redux/qna/answer";
import { useDispatch } from "react-redux";

const QnaReply = ({ index }) => {
  const [value, setValue] = useState("");
  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();

  const onChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  const handleSubmit = (e) => {
    dispatch(answerCreate({ id: index, answer: value }));
    setVisible(!visible);
    setValue("");
  };

  return (
    <>
      {visible ? (
        null
      ) : (
        <Form className="answerInsert" onSubmit={handleSubmit}>
          <InputGroup className="mb-3">
            <Form.Control
              rows={1}
              id={index}
              placeholder="답변 입력"
              aria-label="answer form"
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

export default QnaReply;
