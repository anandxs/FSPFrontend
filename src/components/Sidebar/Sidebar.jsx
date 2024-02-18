import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ sections }) => {
	return (
		<div
			className={`fixed top-24 bg-indigo-900 w-screen z-10 sidebar rounded-e-lg`}
		>
			<ul className="w-full">
				{sections?.map(({ header, link }) => (
					<li key={link} className="hover:bg-indigo-400">
						<NavLink
							to={link}
							className="w-full block py-2 pl-3 text-sm rounded font-semibold text-gray-50"
						>
							{header}
						</NavLink>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Sidebar;
