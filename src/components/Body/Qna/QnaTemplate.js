import { Container } from "react-bootstrap";
import QnaInsert from "./QnaInsert";
import QnaList from "./QnaList";

const QnaTemplate = ({ children }) => {
  return (
    <Container className="qnaContainer justify-content-md-center">
      <div className="qnaTitle">QnA</div>
      <hr></hr>
      <div className="content">{children}</div>
    </Container>
  );
};

export default QnaTemplate;
