import { Modal, ModalTitle, ModalHeader, ModalBody } from "react-bootstrap";
import "./JoinList.css";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { joinList } from "../../../../redux/participation/participation";

const JoinList = ({ show, setShow, boardId, oldBoardId }) => {
	console.log("oldBoardID >> ", oldBoardId);
	const handleShow = () => setShow(false);
	const participation = useSelector(state => state.participation);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(joinList(oldBoardId));
	}, [oldBoardId]);
	console.log(participation)
	return (
		<Modal show={show}
				size="lg"
				aria-labelledby="contained-modal-title-vcenter"
				centered
				scrollable={true}
				onHide={handleShow}>
			<ModalHeader style={{"backgroundColor":"#0D4212"}}>
				<ModalTitle style={{"marginLeft":"auto"}}>
					<AiOutlineClose style={{"color":"white", "cursor":"pointer"}} onClick={handleShow}/>
				</ModalTitle>
			</ModalHeader>
			<ModalBody>
				<table border="0" width={"100%"}>
					<colgroup>
						<col width={"10"} />
						<col width={"90"} />
					</colgroup>
					<thead>
						<tr>
							<th>이름</th>
							<th>정보</th>
						</tr>
					</thead>
					<tbody>
						{
						participation.list.length > 0 ?
						participation.list.map((val, idx) =>
						(
							<>
								<tr rowSpan="3" key={idx}>
									<td className="name" rowSpan="3" key={val.name}>{val.name}</td>
									<td>({val.postcode}) {val.address1}, {val.address2} ({val.address3})</td>
								</tr>
								<tr>
									<td>{val.tel}</td>
								</tr>
								<tr>
									<td>({val.bank}) {val.bankaccount}</td>
								</tr>
							</>
						)) : <tr style={{"textAlign":"center"}}><td colSpan="2">참여자가 없습니다.</td></tr>}
					</tbody>
				</table>
			</ModalBody>
		</Modal>
	);
};

export default JoinList;
