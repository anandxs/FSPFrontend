import { Suspense, lazy } from "react";
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
import AccessDenied from "./components/AccessDenied";
import NotFound from "./components/NotFound";
import ProjectAdminOnly from "./route/ProjectAdminOnly";
import AcceptInvite from "./components/AcceptInvite";
const LazyHome = lazy(() => import("./pages/Home"));
const LazyAdmin = lazy(() => import("./pages/Admin"));
const LazyProfile = lazy(() => import("./pages/Profile"));
const LazyUpdateProfile = lazy(() =>
	import("./components/Profile/UpdateProfile")
);
const LazyUpdatePassword = lazy(() =>
	import("./components/Profile/UpdatePassword")
);
const LazyProject = lazy(() => import("./pages/Project"));
const LazyStages = lazy(() => import("./components/Stage/Stages"));
const LazyTaskTypes = lazy(() => import("./components/Type/Types"));
const LazyRoles = lazy(() => import("./components/Role/Roles"));
const LazyMembers = lazy(() => import("./components/Member/Members"));
const LazyMember = lazy(() => import("./components/Member/Member"));
const LazyProjectSettings = lazy(() =>
	import("./components/Project/ProjectSettings")
);
const LazyTasks = lazy(() => import("./components/Task/Tasks"));
const LazyTask = lazy(() => import("./components/Task/Task"));
const LazyDashboard = lazy(() => import("./components/Dashboard/Dashboard"));
const LazyChat = lazy(() => import("./components/Chat/Chat"));

const App = () => {
	return (
		<>
			<ToastContainer theme="colored" />

			<Suspense fallback="Loading...">
				<Routes>
					<Route element={<UnAuthorizedOnly />}>
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
						<Route path="/forgotpassword" element={<ForgotPassword />} />
						<Route path="/verifyemail" element={<EmailVerified />} />
						<Route path="/resetpassword" element={<ResetPassword />} />
					</Route>

					<Route element={<AuthorizedOnly allowedRoles={[USER]} />}>
						<Route path="/" element={<LazyHome />} />

						<Route path="/acceptinvite" element={<AcceptInvite />} />

						<Route path="/profile" element={<LazyProfile />}>
							<Route path="details" element={<LazyUpdateProfile />} />
							<Route path="passwordchange" element={<LazyUpdatePassword />} />
						</Route>

						<Route path="/projects">
							<Route path=":projectId" element={<LazyProject />}>
								<Route path="tasks">
									<Route index element={<LazyTasks />} />
									<Route path=":taskId" element={<LazyTask />} />
								</Route>
								<Route path="settings" element={<LazyProjectSettings />} />
								<Route path="chat" element={<LazyChat />} />

								<Route element={<ProjectAdminOnly />}>
									<Route path="dashboard" element={<LazyDashboard />} />
									<Route path="stages" element={<LazyStages />} />
									<Route path="types" element={<LazyTaskTypes />} />
									<Route path="roles" element={<LazyRoles />} />
									<Route path="members">
										<Route index element={<LazyMembers />} />
										<Route path=":memberId" element={<LazyMember />} />
									</Route>
								</Route>

								<Route path="*" element={<NotFound />} />
							</Route>

							<Route path="*" element={<Navigate to="/" />} />
						</Route>
					</Route>

					<Route element={<AuthorizedOnly allowedRoles={[SUPERADMIN]} />}>
						<Route path="/admin" element={<LazyAdmin />} />
					</Route>

					<Route
						element={<AuthorizedOnly allowedRoles={[ALL_AUTHENTICATED]} />}
					>
						<Route path="/denied" element={<AccessDenied />} />
					</Route>

					<Route path="/*" element={<NotFound />} />
				</Routes>
			</Suspense>
		</>
	);
};

export default App;
