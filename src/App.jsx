import { Routes, Route, Navigate } from "react-router-dom";
import AuthorizedOnly from "./route/AuthorizedOnly";
import UnAuthorizedOnly from "./route/UnAuthorizedOnly";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./components/NotFound";
import Project from "./pages/Project";
import Groups from "./components/Group/Groups";
import Dashboard from "./components/Dashboard";
import CreateCard from "./components/Card/CreateCard";
import Card from "./components/Card/Card";

function App() {
	return (
		<Routes>
			<Route element={<AuthorizedOnly />}>
				<Route path="/" element={<Home />} />
				<Route path="/:ownerId/projects/:projectId" element={<Project />}>
					<Route path="dashboard" element={<Dashboard />} />
					<Route path="groups" element={<Groups />} />
					<Route path="createCard" element={<CreateCard />} />
					<Route path="groups/:groupId/cards/:cardId" element={<Card />} />
					<Route path="*" element={<Navigate element={<Dashboard />} />} />
				</Route>
			</Route>
			<Route element={<UnAuthorizedOnly />}>
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
			</Route>
			<Route path="/*" element={<NotFound />} />
		</Routes>
	);
}

export default App;
