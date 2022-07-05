import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { create, remove } from "../../../redux/participation/participation";
import { select } from "../../../redux/board/board";
import { getBank } from "../../../redux/user/bankAccount";
import { customAxios } from "../../../redux/customAxios";
import { useNavigate } from "react-router-dom";
import { current } from "immer";

export const ButtonOfWriter = ({ setShow, writer, boardId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleShow = () => setShow(true);

  const bankAccount = useSelector((state) => state.bankAccount);

//   useEffect(() => {
// 	if (writer != null) {
//    		dispatch(getBank(writer));
// 	}
//   }, []);

	const deleteBoard = () => {
		if(window.confirm("삭제하시겠습니까?")) {
			customAxios(`/board/${boardId}`, "delete")
			.then((data) => {
				if(data) {
					navigate("/");
				}
			})
			.catch((err) => {
				console.log(err);
				alert("삭제 중 문제가 발생했습니다.");
			});
		}
	}


	const moveEdit = () => {
		navigate(`/edit/${boardId}`)
	}

	useEffect(() => {
		if (writer != null) {
			dispatch(getBank(writer));
		 }
	  }, [writer]);

	return (
		<>
			<Row style={{"height":"50px"}}>
				<p style={{"marginBottom" : "0"}}><span style={{"color" : "#0D4212", "fontWeight" : "bold"}}>예금주명</span> <span className="Font-gray">: {bankAccount.name}</span></p>
				<p><span style={{"color" : "#0D4212", "fontWeight" : "bold"}}>계좌번호</span> <span className="Font-gray">: {bankAccount.bank} {bankAccount.bankAccount}</span></p>
			</Row>
			<Row>
				<button className="Button-Box Font-21" onClick={handleShow}>참여자 목록보기</button>
			</Row>
			<Row>
				<Col style={{"paddingRight":"0"}}><button className="Button-Box Button-Box-2-left Font-21" onClick={moveEdit}>글 수정</button></Col>
				<Col style={{"padding":"0"}}><button className="Button-Box Button-Box-2-right Font-21" onClick={deleteBoard}>글 삭제</button></Col>
			</Row>
		</>
	);
};

export const ButtonOfReaderBeforeJoin = ({ boardId, day }) => {
  const dispatch = useDispatch();

  const participation = useSelector((state) => state.participation);
  const board = useSelector((state) => state.board);


  const joinParticipation = function () {
    dispatch(create(boardId));
  };

  useEffect(() => {
    if (participation.data) {
      dispatch(select(boardId));
    }
  }, [participation]);

  let currentCount = Number(board.data.get("currentCount"));
  let maxCount = Number(board.data.get("maxCount"));
  console.log(currentCount, maxCount, day, typeof(maxCount));
  return (
    <>
      <Row>
		{currentCount < maxCount && day >= 0 ?
			 <button
			 className="Button-Box Button-Box-Primary Font-21"
			 onClick={() => joinParticipation()}
		   >
			 공구 참여하기
		   </button>
		:	<button
			 className="Button-Box Button-Box-Forbidden Font-21"
			 onClick={() => joinParticipation()}
		     disabled>
			 마감
		   </button>
		}

      </Row>
    </>
  );
};

export const ButtonOfReaderAfterJoin = ({ boardId, writer }) => {
	console.log("w! : ", writer)
  const dispatch = useDispatch();

  const participation = useSelector((state) => state.participation);

  const exitParticipation = function () {
    dispatch(remove(boardId));
  };

//   useEffect(() => {
//     if (participation.data) {
//       dispatch(select(boardId));
//     }
//   }, [participation]);

  const bankAccount = useSelector((state) => state.bankAccount);

  useEffect(() => {
	if (writer != null) {
		dispatch(getBank(writer));
 	}
  }, [writer]);

  return (
    <>
      <Row style={{ height: "50px" }}>
        <p style={{ marginBottom: "0" }}>
          <span style={{ color: "#0D4212", fontWeight: "bold" }}>예금주명</span>{" "}
          <span className="Font-gray">: {bankAccount.name}</span>
        </p>
        <p>
          <span style={{ color: "#0D4212", fontWeight: "bold" }}>계좌번호</span>{" "}
          <span className="Font-gray">
            : {bankAccount.bank} {bankAccount.bankAccount}
          </span>
        </p>
      </Row>
      <Row>
        <button
          className="Button-Box Button-Box-Primary Font-21"
          onClick={() => exitParticipation()}
        >
          참여 취소하기
        </button>
      </Row>
    </>
  );
};
