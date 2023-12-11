import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import Users from "../components/Users";

const Admin = () => {
	const sections = [
		{
			header: "Users",
			link: `/admin`,
		},
	];

	return (
		<div className="flex flex-col h-full">
			<Navbar />
			<div className="grid grid-cols-12 flex-1">
				<Sidebar sections={sections} />
				<Users />
			</div>
		</div>
	);
};

export default Admin;
