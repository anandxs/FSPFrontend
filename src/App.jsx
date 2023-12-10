import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./components/Login";
import RegisterPage from "./pages/Register";
import AuthorizedOnly from "./route/AuthorizedOnly";
import UnAuthorizedOnly from "./route/UnAuthorizedOnly";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route element={<AuthorizedOnly allowedRoles={["All"]} />}>
					<Route path={"/"} element={"Home Page"} />
				</Route>
				<Route element={<UnAuthorizedOnly />}>
					<Route path={"/login"} element={<Login />} />
					<Route path={"/register"} element={<RegisterPage />} />
				</Route>
			</Route>
		</Routes>
	);
}

export default App;
