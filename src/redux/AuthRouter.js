import { check } from "./user/user";

const { useEffect } = require("react");
const { useDispatch, useSelector } = require("react-redux");
const { useNavigate, useLocation } = require("react-router-dom");

const AuthRouter = () => {
	console.log("AUTHROUTER!!!!!!!")
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const checkLogin = useSelector(state => state.checkLogin);

	useEffect(() =>  {
		loginCheckFunc();
	}, []);

	useEffect(() => {
		if(checkLogin.isProceed) {
			checkLogin.isLogin ? toGo() : toHome();
			console.log(checkLogin);
		}
	}, [checkLogin])

	const loginCheckFunc = () => {
		dispatch(check());
	}

	const toHome = () => {
		const from =
			location.pathname === "/login" || location.pathname === "/register" ?
			location.pathname :
			"/login";
		navigate(from);
	}

	const toGo = () => {
		const from =
			location.pathname || "/";
		navigate(from === "/login" || from === "/register" ? "/" : from);
	}

	return <></>;
}

export default AuthRouter;
