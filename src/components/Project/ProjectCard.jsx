import { useNavigate } from "react-router-dom";

const ProjectCard = ({ message, data }) => {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate(`/projects/${data.projectId}/tasks`);
	};

	return (
		<div
			className="bg-blue-600 w-56 h-24 rounded pl-2 pt-2 mb-3 transition hover:shadow-xl focus:outline-none focus:ring active:bg-blue-500"
			onClick={handleClick}
		>
			<p className="text-gray-50 font-bold text-xl">{message}</p>
		</div>
	);
};

export default ProjectCard;
