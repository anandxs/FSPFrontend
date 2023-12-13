import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import ProjectHeader from "../components/Project/ProjectHeader";
import Sidebar from "../components/Sidebar/Sidebar";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useLazyGetProjectMemberQuery } from "../features/member/memberApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../features/auth/authSlice";
import { setRole } from "../features/user/userSlice";

const Project = () => {
	const { projectId } = useParams();
	const sections = [
		{
			header: "Cards",
			link: `/projects/${projectId}/cards`,
		},
		{
			header: "Groups",
			link: `/projects/${projectId}/groups`,
		},
		{
			header: "Members",
			link: `/projects/${projectId}/members`,
		},
	];

	const { id } = useSelector(selectCurrentUser);
	const [getRole] = useLazyGetProjectMemberQuery();

	const dispatch = useDispatch();
	const navigate = useNavigate();
	useEffect(() => {
		getRole({ projectId, memberId: id })
			.unwrap()
			.then((response) => {
				dispatch(
					setRole({
						projectId,
						role: response?.role,
					})
				);
			})
			.catch((err) => {
				console.log(err);
			});
		navigate("cards");
	}, []);

	return (
		<div className="flex flex-col h-full">
			<Navbar />
			<ProjectHeader projectId={projectId} />
			<div className="grid grid-cols-12 flex-1">
				<Sidebar sections={sections} />
				<Outlet />
			</div>
		</div>
	);
};

export default Project;
