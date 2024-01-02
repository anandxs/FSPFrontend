import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ sections, close }) => {
	return (
		<div className="fixed sm:static bg-blue-300 h-screen w-screen z-50 sidebar">
			<button
				onClick={() => close((state) => !state)}
				className="font-semibold w-full text-right pr-3 pt-2"
			>
				X
			</button>
			<ul className="w-full">
				{sections?.map(({ header, link }) => (
					<li
						key={link}
						className="text-center font-semibold text-sm p-2 hover:black"
					>
						<span className="m-1">
							<NavLink to={link}>{header}</NavLink>
						</span>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Sidebar;
