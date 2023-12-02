import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ sections }) => {
	return (
		<div className="bg-accent col-span-2">
			<ul>
				{sections?.map((section) => {
					const { header, link } = section;
					return (
						<li key={link} className="text-center font-semibold text-md p-2">
							<span className="m-1">
								<NavLink to={link}>{header}</NavLink>
							</span>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default Sidebar;
