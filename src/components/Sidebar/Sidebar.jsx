import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ sections }) => {
	return (
		<div className={`fixed top-24 bg-blue-300 w-screen z-10 sidebar`}>
			<ul className="w-full">
				{sections?.map(({ header, link }) => (
					<li key={link} className="hover:bg-blue-400">
						<NavLink
							to={link}
							className="w-full block py-2 pl-3 text-sm rounded font-semibold"
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
