import { NavLink, Routes, Route } from "react-router-dom";
import UpdateProfile from "./UpdateProfile";
import UpdatePassword from "./UpdatePassword";

const ProfileNavbar = () => {
	return (
		<>
			<nav className="flex gap-2 text-xs sm:text-base font-semibold w-10/12 md:w-3/4 mt-8 mx-auto">
				<NavLink to={"/profile"}>Update Profile</NavLink>
				<NavLink to={"/profile/passwordchange"}>Change Password</NavLink>
			</nav>
			<Routes>
				<Route index to="profile/passwordchange" element={<UpdatePassword />} />
				<Route to="profile" element={<UpdateProfile />} />
			</Routes>
		</>
	);
};

export default ProfileNavbar;
