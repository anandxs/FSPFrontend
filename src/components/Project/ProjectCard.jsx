import { useNavigate } from "react-router-dom";

const ProjectCard = ({ message, data }) => {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate(`/projects/${data.projectId}/tasks`);
	};

	return (
		<div
			className="bg-primary w-56 h-24 rounded pl-2 pt-2 mb-3"
			onClick={handleClick}
		>
			<p className="text-white font-bold text-xl">{message}</p>
		</div>
	);
};

export default ProjectCard;
