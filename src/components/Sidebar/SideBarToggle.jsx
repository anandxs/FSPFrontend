import { Squash as Hamburger } from "hamburger-react";

const SideBarToggle = ({ toggle, handleToggle }) => {
	return (
		<Hamburger
			toggled={toggle}
			toggle={handleToggle}
			size={24}
			color="#fff"
			distance="sm"
			rounded
		/>
	);
};

export default SideBarToggle;
