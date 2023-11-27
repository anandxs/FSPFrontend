import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
	selectOwnerId,
	selectProjectId,
} from "../features/project/projectSlice";

const Sidebar = () => {
	const projectId = useSelector(selectProjectId);
	const ownerId = useSelector(selectOwnerId);

	return (
		<div className="bg-accent col-span-2">
			<ul>
				<li className="text-right font-semibold text-md mr-5">&lt;</li>
				<li className="text-center font-semibold text-md p-2">
					<span className="m-1">
						<Link to={`/${ownerId}/projects/${projectId}`}>Dashboard</Link>
					</span>
				</li>
				<li className="text-center font-semibold text-md p-2">
					<span className="m-1">
						<Link to={`/${ownerId}/projects/${projectId}/groups`}>Groups</Link>
					</span>
				</li>
				<li className="text-center font-semibold text-md p-2">
					<span className="m-1">
						<Link to={`/${ownerId}/projects/${projectId}/members`}>
							Members
						</Link>
					</span>
				</li>
			</ul>
		</div>
	);
};

export default Sidebar;
