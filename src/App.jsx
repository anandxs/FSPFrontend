import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ALL_AUTHENTICATED, SUPERADMIN, USER } from "./utils/constants";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthorizedOnly from "./route/AuthorizedOnly";
import UnAuthorizedOnly from "./route/UnAuthorizedOnly";
import Login from "./components/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import EmailVerified from "./pages/EmailVerified";
import ResetPassword from "./pages/ResetPassword";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import AccessDenied from "./components/AccessDenied";
import NotFound from "./components/NotFound";
import Profile from "./pages/Profile";
import UpdateProfile from "./components/Profile/UpdateProfile";
import UpdatePassword from "./components/Profile/UpdatePassword";
import Project from "./pages/Project";
import Stages from "./components/Stage/Stages";
import TaskTypes from "./components/Type/Types";
import Roles from "./components/Role/Roles";
import Members from "./components/Member/Members";
import Member from "./components/Member/Member";
import ProjectSettings from "./components/Project/ProjectSettings";
import Tasks from "./components/Task/Tasks";
import Task from "./components/Task/Task";
import Dashboard from "./components/Dashboard/Dashboard";
import ProjectAdminOnly from "./route/ProjectAdminOnly";
import AcceptInvite from "./components/AcceptInvite";
import Chat from "./components/Chat/Chat";

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

					<Route path="/acceptinvite" element={<AcceptInvite />} />

					<Route path="/profile" element={<Profile />}>
						<Route path="details" element={<UpdateProfile />} />
						<Route path="passwordchange" element={<UpdatePassword />} />
					</Route>

					<Route path="/projects">
						<Route path=":projectId" element={<Project />}>
							<Route path="tasks">
								<Route index element={<Tasks />} />
								<Route path=":taskId" element={<Task />} />
							</Route>
							<Route path="settings" element={<ProjectSettings />} />
							<Route path="chat" element={<Chat />} />

							<Route element={<ProjectAdminOnly />}>
								<Route path="dashboard" element={<Dashboard />} />
								<Route path="stages" element={<Stages />} />
								<Route path="types" element={<TaskTypes />} />
								<Route path="roles" element={<Roles />} />
								<Route path="members">
									<Route index element={<Members />} />
									<Route path=":memberId" element={<Member />} />
								</Route>
							</Route>

							<Route path="*" element={<NotFound />} />
						</Route>

						<Route path="*" element={<Navigate to="/" />} />
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
