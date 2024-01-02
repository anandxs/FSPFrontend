import { NavLink } from "react-router-dom";

const Sidebar = ({ sections }) => {
	return (
		<div className="hidden">
			<ul>
				{sections?.map(({ header, link }) => (
					<li
						key={link}
						className="text-center font-semibold text-md p-2 hover:black"
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
