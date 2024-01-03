import CreateProjectCard from "./CreateProjectCard";
import ProjectCard from "./ProjectCard";
import { useGetUserProjectsQuery } from "../../features/project/projectApiSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearRole } from "../../features/user/userSlice";

const Projects = () => {
	const { data, isLoading, isSuccess, isError, error } =
		useGetUserProjectsQuery();

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(clearRole());
	}, []);

	let content = "";
	if (isLoading) {
		content = <p>Loading...</p>;
	} else if (isSuccess) {
		if (data.length === 0) {
			content = <p>Looks like you don't have any ongoing projects</p>;
		} else {
			content = data.map((p) => (
				<ProjectCard key={p.projectId} message={p.name} data={p} />
			));
		}
	} else if (isError) {
		console.log(error);
		content = <p>Something went wrong!</p>;
	}

	return (
		<section>
			<div className="w-5/6 sm:w-3/4 mx-auto mt-5 mb-3">
				<CreateProjectCard message={"Start New Project"} />
			</div>
			<div className="w-5/6 sm:w-3/4 mx-auto mt-5">
				<h2 className="text-md sm:text-xl font-bold mb-1">Your Projects</h2>
				<div className="flex gap-2 flex-wrap">{content}</div>
			</div>
		</section>
	);
};

export default Projects;
