import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import AuthorizedOnly from "./route/AuthorizedOnly";
import UnAuthorizedOnly from "./route/UnAuthorizedOnly";
import Login from "./components/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import EmailVerified from "./pages/EmailVerified";
import ResetPassword from "./pages/ResetPassword";
import Home from "./pages/Home";
import { ALL_AUTHENTICATED, SUPERADMIN, USER } from "./utils/constants";
import Admin from "./pages/Admin";
import AccessDenied from "./components/AccessDenied";
import NotFound from "./components/NotFound";
import Profile from "./pages/Profile";
import UpdateProfile from "./components/Profile/UpdateProfile";
import UpdatePassword from "./components/Profile/UpdatePassword";

const App = () => {
	return (
		<>
			<ToastContainer theme="colored" />

			<Routes>
				<Route element={<UnAuthorizedOnly />}>
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/forgotpassword" element={<ForgotPassword />} />
					<Route path="/verifyemail" element={<EmailVerified />} />
					<Route path="/resetpassword" element={<ResetPassword />} />
				</Route>

				<Route element={<AuthorizedOnly allowedRoles={[USER]} />}>
					<Route path="/" element={<Home />} />
					<Route path="/profile" element={<Profile />}>
						<Route path="details" element={<UpdateProfile />} />
						<Route path="passwordchange" element={<UpdatePassword />} />
					</Route>
				</Route>

				<Route element={<AuthorizedOnly allowedRoles={[SUPERADMIN]} />}>
					<Route path="/admin" element={<Admin />} />
				</Route>

				<Route element={<AuthorizedOnly allowedRoles={[ALL_AUTHENTICATED]} />}>
					<Route path="/denied" element={<AccessDenied />} />
				</Route>

				<Route path="/*" element={<NotFound />} />
			</Routes>
		</>
	);
};

export default App;
