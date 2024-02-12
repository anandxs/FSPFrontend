import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ sections, close }) => {
	return (
		<div
			className={`fixed sm:static bg-blue-300 w-screen h-screen z-10 sidebar`}
		>
			<button
				onClick={close}
				className="font-semibold w-full text-right pr-3 pt-2"
			>
				X
			</button>
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
