import Header from "./Header/Header";
import Footer from "./Footer/Footer"
import { Outlet } from "react-router-dom";
import AuthRouter from "../redux/AuthRouter";

const Layout = () => {
	return (
		<div>
			{/* <AuthRouter></AuthRouter> */}

			<Header></Header>

			<Outlet />

			<Footer></Footer>
		</div>
	)
}

export default Layout;
