import { NavLink } from "react-router-dom";

const ProfileNavbar = () => {
	return (
		<nav className="flex gap-2 text-xs sm:text-base font-semibold w-10/12 md:w-3/4 mt-8 mx-auto">
			<NavLink to={"/profile/details"}>Update Profile</NavLink>
			<NavLink to={"/profile/passwordchange"}>Change Password</NavLink>
		</nav>
	);
};

export default ProfileNavbar;
