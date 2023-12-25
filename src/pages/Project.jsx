import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import { useParams } from "react-router-dom";
import { useLazyGetProjectQuery } from "../features/project/projectApiSlice";
import { useLazyGetMemberByIdQuery } from "../features/member/memberApiSlice";
import { createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../features/auth/authSlice";
import { selectCurrentProjectRole, setRole } from "../features/user/userSlice";

export const ProjectContext = createContext({
	projectId: null,
	name: null,
	ownerId: null,
});

const Project = () => {
	const { projectId } = useParams();

	const [getProjectAsync] = useLazyGetProjectQuery();
	const [getMemberAsync] = useLazyGetMemberByIdQuery();
	const { id } = useSelector(selectCurrentUser);

	const dispatch = useDispatch();

	const [data, setData] = useState({});
	useEffect(() => {
		getProjectAsync({ projectId })
			.unwrap()
			.then((project) => {
				setData(project);

				getMemberAsync({ projectId, memberId: id })
					.unwrap()
					.then(({ role }) => {
						dispatch(
							setRole({
								projectId,
								ownerId: project?.ownerId,
								role,
							})
						);
					})
					.catch((err) => {
						console.log(err);
					});
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	let sections = [
		{
			header: "Tasks",
			link: `/projects/${projectId}/tasks`,
		},
		{
			header: "Dashboard",
			link: `/projects/${projectId}/dashboard`,
		},
		{
			header: "Stages",
			link: `/projects/${projectId}/stages`,
		},
		{
			header: "Task Types",
			link: `/projects/${projectId}/types`,
		},
		{
			header: "Roles",
			link: `/projects/${projectId}/roles`,
		},
		{
			header: "Members",
			link: `/projects/${projectId}/members`,
		},
		{
			header: "Settings",
			link: `/projects/${projectId}/settings`,
		},
		{
			header: "Chat",
			link: `/projects/${projectId}/chat`,
		},
	];

	const { role } = useSelector(selectCurrentProjectRole);

	if (role?.name !== "ADMIN") {
		sections = [
			{
				header: "Tasks",
				link: `/projects/${projectId}/tasks`,
			},
			{
				header: "Settings",
				link: `/projects/${projectId}/settings`,
			},
			{
				header: "Chat",
				link: `/projects/${projectId}/chat`,
			},
		];
	}

	return (
		<ProjectContext.Provider value={{ ...data }}>
			<div className="flex flex-col h-full">
				<Navbar />
				<div className="grid grid-cols-12 flex-1">
					<Sidebar sections={sections} />
					<div className="col-span-10">
						<h1 className="underline px-3 py-1 font-bold text-lg bg-primary text-white">
							{data?.name}
						</h1>
						<Outlet />
					</div>
				</div>
			</div>
		</ProjectContext.Provider>
	);
};

export default Project;
