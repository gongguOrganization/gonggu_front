import { useCallback, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";

const QnaInsert = ({ onInsert }) => {
  const [value, setValue] = useState("");
  const [disabled, setDisabled] = useState(false);

  const onChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  const handleSubmit = async (e) => {
    setDisabled(true);

    onInsert(value);
    setValue("");
    e.preventdefault();

    setDisabled(false);
  };
  return (
    <>
      <Form className="qnaInsert" onSubmit={handleSubmit}>
        <InputGroup className="mb-3">
          <Form.Control
            rows={3}
            placeholder="댓글 입력 창"
            aria-label="qna form"
            aria-describedby="basic-addon2"
            onChange={onChange}
          />
          <Button
            type="submit"
            variant="outline-secondary"
            id="qnaSubmit"
            disabled={disabled}
          >
            저장
          </Button>
        </InputGroup>
      </Form>
    </>
  );
};

export default QnaInsert;
