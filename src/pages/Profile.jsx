import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import ProfileCard from "../components/Profile/ProfileCard";
import ProfileNavbar from "../components/Profile/ProfileNavbar";

const Profile = () => {
	return (
		<>
			<Navbar />
			<ProfileCard />
			<ProfileNavbar />
			<Outlet />
		</>
	);
};

export default Profile;
