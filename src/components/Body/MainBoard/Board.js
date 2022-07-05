import "./Board.css";
import { FaSearch } from "react-icons/fa";
import { Card, Row, Button } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { boardSelect } from "./../../../redux/board/mainboard";

const Board = () => {
  return (
    <div>
      <Search></Search>
      <br></br>
      <div className="CardPosition">
        {Array.from({ length: 1 }).map((_, idx) => (
          <BoardContent key={idx}></BoardContent>
        ))}
      </div>
    </div>
  );
};

export default Board;

const Search = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const mainboard = useSelector((state) => state.mainboard);

  const handleOnClick = () => {
    dispatch(boardSelect({ title: document.getElementById("title").value }));
  };

  return (
    <>
      <div className="Searchbar">
        <input
          className="SInput"
          type="text"
          id="title"
          placeholder="검색어 입력"
        ></input>
        <Button className="SearchButton" onClick={() => handleOnClick()}>
          <FaSearch />
        </Button>
      </div>
    </>
  );
};

const BoardContent = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const mainboard = useSelector((state) => state.mainboard);

  useEffect(() => {
    dispatch(boardSelect({ title: "" }));
  }, []);

  const bucket = "imagestore-39fb6.appspot.com";

  return mainboard.data.map((mainboard, idx) => (
    <Card className="CardStyle CardDisplay">
      <Link to={`/detail/${mainboard.id}`} className="detail-link">
        <Card.Body>
          <Card.Img
            className="ContentImg"
            variant="top"
            alt="img"
			onError={(e)=>{e.target.onerror = null; e.target.src="/images/logo.png"}}
            src={`https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${mainboard.img}?alt=media`}
          />
          <br></br>
          <br></br>
          <Card.Title className="TitleText">
            <h5>{mainboard.title}</h5>
            <br></br>
            <div style={{"textAlign":"right", "paddingRight":"20px"}}>
              {mainboard.currentCount}명 / {mainboard.maxCount}명{" "}
            </div>
          </Card.Title>
          <br></br>
          <hr className="ContentLine"></hr>
          <Card.Text className="DayText">
            <span>{mainboard.endDate}</span>
          </Card.Text>
          <Card.Text className="M">
            <span>{mainboard.price} 원</span>
          </Card.Text>
        </Card.Body>
      </Link>
    </Card>
  ));
};
