import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthorizedOnly from "./route/AuthorizedOnly";
import UnAuthorizedOnly from "./route/UnAuthorizedOnly";
import Profile from "./pages/Profile";
import LoadUser from "./components/Profile/LoadUser";
import EmailVerified from "./pages/EmailVerified";
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const Home = lazy(() => import("./pages/Home"));
const Dashboard = lazy(() => import("./components/Dashboard"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Groups = lazy(() => import("./components/Group/Groups"));
const Card = lazy(() => import("./components/Card/Card"));
const NotFound = lazy(() => import("./components/NotFound"));
const Project = lazy(() => import("./pages/Project"));
const UpdateProfile = lazy(() => import("./components/Profile/UpdateProfile"));
const UpdatePassword = lazy(() =>
	import("./components/Profile/UpdatePassword")
);
const Members = lazy(() => import("./components/Members"));

function App() {
	return (
		<Routes>
			<Route element={<AuthorizedOnly />}>
				<Route
					path="/"
					element={
						<Suspense fallback="Loading...">
							<Home />
						</Suspense>
					}
				/>
				<Route path="/load" element={<LoadUser />} />
				<Route path="/profile" element={<Profile />}>
					<Route
						path="details"
						element={
							<Suspense fallback="Loading..">
								<UpdateProfile />
							</Suspense>
						}
					/>
					<Route
						path="passwordchange"
						element={
							<Suspense fallback="Loading...">
								<UpdatePassword />
							</Suspense>
						}
					/>
				</Route>
				<Route
					path="/:ownerId/projects/:projectId"
					element={
						<Suspense fallback="Loading...">
							<Project />
						</Suspense>
					}
				>
					<Route
						index={true}
						path=""
						element={
							<Suspense fallback="Loading...">
								<Dashboard />
							</Suspense>
						}
					/>
					<Route
						path="groups"
						element={
							<Suspense fallback="Loading...">
								<Groups />
							</Suspense>
						}
					/>
					<Route
						path="groups/:groupId/cards/:cardId"
						element={
							<Suspense fallback="Loading...">
								<Card />
							</Suspense>
						}
					/>
					<Route
						path="members"
						element={
							<Suspense fallback="Loading...">
								<Members />
							</Suspense>
						}
					/>
				</Route>
			</Route>
			<Route element={<UnAuthorizedOnly />}>
				<Route
					path="/login"
					element={
						<Suspense fallback="Loading...">
							<Login />
						</Suspense>
					}
				/>
				<Route
					path="/register"
					element={
						<Suspense fallback="Loading...">
							<Register />
						</Suspense>
					}
				/>
				<Route
					path="/verifyemail"
					element={
						<Suspense fallback="Loading...">
							<EmailVerified />
						</Suspense>
					}
				/>
				<Route
					path="/forgotpassword"
					element={
						<Suspense fallback="Loading...">
							<ForgotPassword />
						</Suspense>
					}
				/>
				<Route
					path="/resetpassword"
					element={
						<Suspense fallback="Loading...">
							<ResetPassword />
						</Suspense>
					}
				/>
			</Route>
			<Route
				path="/*"
				element={
					<Suspense fallback="Loading...">
						<NotFound />
					</Suspense>
				}
			/>
		</Routes>
	);
}

export default App;
