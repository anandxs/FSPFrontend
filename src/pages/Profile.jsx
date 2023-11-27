import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import ProfileCard from "../components/Profile/ProfileCard";
import ProfileNavbar from "../components/Profile/ProfileNavbar";
import { useEffect } from "react";

const Profile = () => {
	const navigate = useNavigate();

	useEffect(() => {
		navigate("/profile/details");
	}, []);

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
