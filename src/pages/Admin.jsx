import { useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";

const Admin = () => {
	const navigate = useNavigate();
	useEffect(() => {
		navigate("roles");
	}, []);

	const sections = [
		{
			header: "Roles",
			link: `/admin/roles`,
		},
	];

	return (
		<div className="flex flex-col h-full">
			<Navbar />
			<div className="grid grid-cols-12 flex-1">
				<Sidebar sections={sections} />
				<Outlet />
			</div>
		</div>
	);
};

export default Admin;
