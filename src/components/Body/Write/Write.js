import { Container, Row, Col } from "react-bootstrap";
import "./Write.css";
import ToastEditer from "../Editor";
import { create, init, update } from "../../../redux/board/board";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { categorySelect } from "../../../redux/category/category";

const Write = () => {

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const board = useSelector(state => state.board);
	const category = useSelector(state => state.category);

	useEffect(() => {
		console.log(board)
		if(!board.loading && board.success) {
			alert('등록이 완료되었습니다.');
			dispatch(init());
			navigate("/");
		}
	}, [board])

	useEffect(() => {
		dispatch(categorySelect());
		dispatch(init());
	}, [])

	const handleOnChange = ({ target }) => {
		dispatch(update({id: target.id, value: target.value}));
	}

	const handleOnChangeCtg = ({ target }) => {
		dispatch(update({id: "categoryId", value: target.value}));
		dispatch(update({id: "categoryName", value: target.options[target.options.selectedIndex].innerHTML}));
	}

	const handleOnChangeFile = ({ target }) => {
		let file = target.files[0];
		dispatch(update({id: 'file', value: file}));
		dispatch(update({id: 'fileName', value: file.name}));
	}

	const handleOnSubmit = () => {
		try {
			dispatch(create(board));
		} catch (err) {
			console.log(err);
		}

	}

	return (
		<>
			<div className="Center-Text">
				<h1>공구 모집 글쓰기</h1>
			</div>
			<Container className="WriteBox">
				<Row>
					<div>
						<div className="w-15 write-label">카테고리</div>
						<div className="w-50 write-value">
							<select className="w-60 glass" id="categoryId" value={board.data.categoryId} onChange={handleOnChangeCtg}>
								<option>--선택--</option>
								{category.data.map(val => (
									<option key={val.categoryId} value={val.categoryId}>{val.categoryName}</option>
								))}
							</select>
						</div>
					</div>
				</Row>
				<Row>
					<div>
						<div className="w-15 write-label">제목</div>
						<div className="w-100 write-value h-44">
							<input className="w-80 glass" id="title" value={board.data.title} onChange={handleOnChange} type="text" placeholder="제목을 입력해주세요."></input>
						</div>
					</div>
				</Row>
				<Row>
					<Col xs={3}>
						<div>
							<div className="write-label" style={{"width": "48%"}}>모집인원</div>
							<div className="w-100 write-value h-44">
								<input className="glass input-small" id="maxCount" value={board.data.maxCount} onChange={handleOnChange} style={{"width": "37%"}} type="number" min="0" placeholder="모집인원"></input>
							</div>
						</div>
					</Col>
					<Col xs={4}>
						<div>
							<div className="write-label" style={{"width": "48%"}}>가격</div>
							<div className="w-100 write-value h-44">
								<input className="glass input-small" id="price" value={board.data.price} onChange={handleOnChange} style={{"width": "37%"}} type="number" min="0"  placeholder="가격"></input>
							</div>
						</div>
					</Col>
					<Col xs={5}>
						<div>
							<div className="write-label" style={{"width": "48%"}}>마감날짜</div>
							<div className="w-100 write-value h-44">
								<input className="glass write-date" id="endDate" value={board.data.endDate} onChange={handleOnChange} style={{"width": "37%"}} type="date" max="9999-12-31"></input>
							</div>
						</div>
					</Col>
				</Row>
				<Row>
					<ToastEditer board={board} handleOnChange={handleOnChange}/>
					{/* <div>
						<div className="w-15 write-label" style={{"height": "200px", "lineHeight": "175px"}}>내용</div>
						<div className="w-100 write-value" style={{"height": "200px"}}>
							<textarea className="write-textarea glass" placeholder="내용을 입력해주세요."/>
						</div>
					</div> */}
				</Row>
				<Row>
					<div  style={{"marginTop":"20px"}}>
						<div className="w-15 write-label write-last">사진 첨부하기</div>
						<div className="w-100 write-value h-44 write-last">
							<input className="w-80 glass" id="img" accept="image/*" value={board.data.img} onChange={handleOnChangeFile} type="file"></input>
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

export default Write;
