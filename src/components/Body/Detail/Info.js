import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { joinState } from "../../../redux/participation/participation";
import { ButtonOfWriter, ButtonOfReaderBeforeJoin, ButtonOfReaderAfterJoin} from "./InfoButton";

const Detail = ({ setShow, boardId, board }) => {

	const setDate = new Date(board.data.get('endDate')); //end Date
	const now = new Date(); //today Date
	const distance = setDate.getTime() - now.getTime();
	let day = Math.floor(distance/(1000*60*60*24));
	console.log("day : ", day);
	const dispatch = useDispatch();
	const participation = useSelector((state) => state.participation);

	useEffect(() => {
		dispatch(joinState(boardId))
	}, []);

	return (
		<>
			<Row><span className="D-day" style={{"marginLeft":"10px"}}>D{day < 0 ? '+' + -day : '-' + day}</span></Row>
			<Row>
				<Col xs={8}><span className="Font-50">{board.data.get('title')}</span></Col>
				<Col className="Text-right mt-auto"><span className="Font-40">{board.data.get('currentCount')}</span><span className="Font-20 Font-gray">/{board.data.get('maxCount')}</span></Col>
			</Row>
			<Row className="mt-1">
				<progress value={board.data.get('currentCount')} max={board.data.get('maxCount')}></progress>
			</Row>
			<Row>
				<p className="Bold-font" style={{"textAlign":"right"}}>{board.data.get('price')}<span className="Normal-font">원</span></p>
			</Row>
			{localStorage.getItem('id') === board.data.get('userId') ? <ButtonOfWriter setShow={setShow} boardId={boardId} writer={board.data.get("userId")}/> : null}
			{localStorage.getItem('id') !== board.data.get('userId') && !participation.data ? <ButtonOfReaderBeforeJoin boardId={boardId} day={day}/> : null}
			{localStorage.getItem('id') !== board.data.get('userId') && participation.data ? <ButtonOfReaderAfterJoin boardId={boardId} writer={board.data.get("userId")}/> : null}

		</>
	);
};

export default Detail;
