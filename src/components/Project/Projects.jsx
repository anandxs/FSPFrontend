import CreateProjectCard from "./CreateProjectCard";
import ProjectCard from "./ProjectCard";
import { useGetUserProjectsQuery } from "../../features/project/projectApiSlice";

const Projects = () => {
	const { data, isLoading, isSuccess, isError, error } =
		useGetUserProjectsQuery();

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
			<div className="w-full mt-3 pt-3 sm:pl-36 md:pl-48">
				<CreateProjectCard message={"Start New Project"} />
			</div>
			<div className="mt-10 pt-3 sm:px-36 md:px-48">
				<h2 className="text-2xl font-bold mb-3">Your Projects</h2>
				<div className="flex flex-wrap justify-center sm:justify-start gap-5">
					{content}
				</div>
			</div>
		</section>
	);
};

export default Projects;
