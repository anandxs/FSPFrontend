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

			<Suspense fallback={<Loading />}>
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

const Loading = () => (
	<div className="w-screen h-screen flex justify-center items-center">
		<div className="w-16 h-16">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
				<radialGradient
					id="a10"
					cx=".66"
					fx=".66"
					cy=".3125"
					fy=".3125"
					gradientTransform="scale(1.5)"
				>
					<stop offset="0" stopColor="#0E61DD"></stop>
					<stop offset=".3" stopColor="#0E61DD" stopOpacity=".9"></stop>
					<stop offset=".6" stopColor="#0E61DD" stopOpacity=".6"></stop>
					<stop offset=".8" stopColor="#0E61DD" stopOpacity=".3"></stop>
					<stop offset="1" stopColor="#0E61DD" stopOpacity="0"></stop>
				</radialGradient>
				<circle
					transform-origin="center"
					fill="none"
					stroke="url(#a10)"
					strokeWidth="15"
					strokeLinecap="round"
					strokeDasharray="200 1000"
					strokeDashoffset="0"
					cx="100"
					cy="100"
					r="70"
				>
					<animateTransform
						type="rotate"
						attributeName="transform"
						calcMode="spline"
						dur="2"
						values="360;0"
						keyTimes="0;1"
						keySplines="0 0 1 1"
						repeatCount="indefinite"
					></animateTransform>
				</circle>
				<circle
					transform-origin="center"
					fill="none"
					opacity=".2"
					stroke="#0E61DD"
					strokeWidth="15"
					strokeLinecap="round"
					cx="100"
					cy="100"
					r="70"
				></circle>
			</svg>
		</div>
	</div>
);

export default App;
