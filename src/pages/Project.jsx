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
								projectName: project?.name,
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
			header: "Chat",
			link: `/projects/${projectId}/chat`,
		},
		{
			header: "Settings",
			link: `/projects/${projectId}/settings`,
		},
	];

	const { role, projectName } = useSelector(selectCurrentProjectRole);

	if (role?.name !== "ADMIN") {
		sections = [
			{
				header: "Tasks",
				link: `/projects/${projectId}/tasks`,
			},
			{
				header: "Chat",
				link: `/projects/${projectId}/chat`,
			},
			{
				header: "Settings",
				link: `/projects/${projectId}/settings`,
			},
		];
	}

	const [toggle, setToggle] = useState(false);

	return (
		<ProjectContext.Provider value={{ ...data }}>
			<div
				className={`flex flex-col h-screen ${
					toggle ? "overflow-hidden sm:overflow-auto" : ""
				}`}
			>
				<Navbar />
				<div className="flex">
					{toggle && <Sidebar sections={sections} close={setToggle} />}
					<div className="flex-1 w-full">
						<div className="bg-primary flex gap-5 items-center p-1 pl-2">
							{!toggle && (
								<SideBarToggle toggle={toggle} setToggle={setToggle} />
							)}
							<h1 className="font-semibold text-lg text-white">
								{projectName ? projectName : "Loading..."}
							</h1>
						</div>
						<div className="mx-auto max-w-screen-xl p-2 pt-0">
							<Outlet />
						</div>
					</div>
				</div>
			</div>
		</ProjectContext.Provider>
	);
};

const SideBarToggle = ({ setToggle }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="currentColor"
			className="w-4 h-4 sm:w-5 sm:h-5 text-white font-semibold border-2 border-white"
			onClick={() => setToggle((state) => !state)}
		>
			<path
				fillRule="evenodd"
				d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
				clipRule="evenodd"
			/>
		</svg>
	);
};

export default Project;
