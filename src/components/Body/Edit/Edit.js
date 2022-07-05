import { Container, Row, Col } from "react-bootstrap";
import "./Edit.css";
import ToastEditer from "../Editor";
import { create, init, select, update, updateData } from "../../../redux/board/board";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

const Edit = () => {

	const bucket = "imagestore-39fb6.appspot.com";
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { id } = useParams();
	const board = useSelector(state => state.board);

	const handleOnChange = ({ target }) => {
		dispatch(update({id: target.id, value: target.value}));
	}

	const handleOnChangeFile = ({ target }) => {
		let file = target.files[0];
		dispatch(update({id: 'file', value: file}));
		dispatch(update({id: 'fileName', value: file.name}));
	}

	const handleOnSubmit = () => {
		dispatch(updateData(board));
	}

	const [existFile, setExistFile] = useState(false);

	useEffect(() => {
		dispatch(select(id));
	}, []);

	useEffect(() => {
		if(board.data.get("img") !== 'null') {
			setExistFile(true);
		}else {
			setExistFile(false)
		}
		if(!board.loading && board.success) {
			alert('수정이 완료되었습니다.');
			dispatch(init());
			navigate("/");
		}
	}, [board]);

	const deleteFile = () => {
		setExistFile(false);
	}

	return (
		<>
			<div className="Center-Text">
				<h1>공구 모집 글 수정하기</h1>
			</div>
			<Container className="WriteBox">
				<Row>
					<div>
						<div className="w-15 write-label">카테고리</div>
						<div className="w-50 write-value">
							<select className="w-60 glass" id="categoryId" defaultValue={board.data.has("categoryId") ? board.data.get("categoryId") : 0} onChange={handleOnChange}>
								<option value="0">실시간</option>
								<option value="1">음식</option>
								<option value="2">의류</option>
							</select>
						</div>
					</div>
				</Row>
				<Row>
					<div>
						<div className="w-15 write-label">제목</div>
						<div className="w-100 write-value h-44">
							<input className="w-80 glass" id="title" defaultValue={board.data.has("title") ? board.data.get("title") : 0} onChange={handleOnChange} type="text" placeholder="제목을 입력해주세요."></input>
						</div>
					</div>
				</Row>
				<Row>
					<Col xs={3}>
						<div>
							<div className="write-label" style={{"width": "48%"}}>모집인원</div>
							<div className="w-100 write-value h-44">
								<input className="glass input-small" id="maxCount" defaultValue={board.data.has("maxCount") ? board.data.get("maxCount") : 0} onChange={handleOnChange} style={{"width": "37%"}} type="number" min="0" placeholder="모집인원"></input>
							</div>
						</div>
					</Col>
					<Col xs={4}>
						<div>
							<div className="write-label" style={{"width": "48%"}}>가격</div>
							<div className="w-100 write-value h-44">
								<input className="glass input-small" id="price" defaultValue={board.data.has("price") ? board.data.get("price") : 0} onChange={handleOnChange} style={{"width": "37%"}} type="number" min="0"  placeholder="가격"></input>
							</div>
						</div>
					</Col>
					<Col xs={5}>
						<div>
							<div className="write-label" style={{"width": "48%"}}>마감날짜</div>
							<div className="w-100 write-value h-44">
								<input className="glass write-date" id="endDate" defaultValue={board.data.has("endDate") ? board.data.get("endDate") : 0} onChange={handleOnChange} style={{"width": "37%"}} type="date" max="9999-12-31"></input>
							</div>
						</div>
					</Col>
				</Row>
				<Row>
					<ToastEditer board={board} handleOnChange={handleOnChange} content={board.data.has("content") ? board.data.get("content") : ""}/>
				</Row>
				<Row>
					<div  style={{"marginTop":"20px"}}>
						<div className="w-15 write-label write-last">사진 첨부하기</div>
						<div className="w-100 write-value h-44 write-last" style={{"textAlign": "left"}}>
							{existFile ?
							<div>
								<a style={{"paddingLeft": "10px", "color": "#0D4212"}} href={board.data.has("img") ? `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${board.data.get("img")}?alt=media` : null} >
									{board.data.has("imgName") ? board.data.get("imgName") : null}
								</a>
								<AiOutlineClose className="hover" style={{"marginLeft":"10px"}} onClick={deleteFile}/>
							</div> :
							<input className="w-80 glass" style={{"paddingLeft": "10px"}} id="img" accept="image/*" value={board.data.img} onChange={handleOnChangeFile} type="file"></input>
							}
						</div>
					</div>
				</Row>
			</Container>
			<Row style={{"marginBottom" : "20px"}}>
				<Col></Col>
				<Col xs={6} style={{"textAlign":"right"}}>
					<div>
						<button className="Button-Box Button-Box-Primary Font-18" style={{"width":"150px", "marginRight":"10px"}} onClick={handleOnSubmit}>등록하기</button>
						<button className="Button-Box Font-18" style={{"width":"150px"}}>돌아가기</button>
					</div>
				</Col>
				<Col></Col>
			</Row>
		</>
	);
};

export default Edit;
