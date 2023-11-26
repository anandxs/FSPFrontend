import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthorizedOnly from "./route/AuthorizedOnly";
import UnAuthorizedOnly from "./route/UnAuthorizedOnly";
import Profile from "./pages/Profile";
import LoadUser from "./components/Profile/LoadUser";
import UpdateProfile from "./components/Profile/UpdateProfile";
import EmailVerified from "./pages/EmailVerified";
const Home = lazy(() => import("./pages/Home"));
const Dashboard = lazy(() => import("./components/Dashboard"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Groups = lazy(() => import("./components/Group/Groups"));
const Card = lazy(() => import("./components/Card/Card"));
const NotFound = lazy(() => import("./components/NotFound"));
const CreateCard = lazy(() => import("./components/Card/CreateCard"));
const Project = lazy(() => import("./pages/Project"));

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
				<Route path="/profile/*" element={<Profile />} />
				<Route
					path="/:ownerId/projects/:projectId"
					element={
						<Suspense fallback="Loading...">
							<Project />
						</Suspense>
					}
				>
					<Route
						path="dashboard"
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
						path="createCard"
						element={
							<Suspense fallback="Loading...">
								<CreateCard />
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
