import { useDispatch, useSelector } from "react-redux";
import { logOut, selectCurrentUser } from "../features/auth/authSlice";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { unsetProject } from "../features/project/projectSlice";

const Navbar = () => {
	const { name } = useSelector(selectCurrentUser);
	const [displayName, setDisplayName] = useState();

	useEffect(() => {
		let temp = "";
		name.split(" ").forEach((w) => {
			temp += w[0];
		});
		setDisplayName(temp.toUpperCase());
	}, []);

	const dispatch = useDispatch();

	const handleLogout = () => {
		dispatch(logOut());
		dispatch(unsetProject());
	};

	return (
		<nav className="bg-accent border-b-2 border-b-shadow">
			<div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-2">
				<Link
					to={"/"}
					className="flex items-center space-x-3 rtl:space-x-reverse"
				>
					<img
						src="https://flowbite.com/docs/images/logo.svg"
						className="h-5"
						alt="Logo"
					/>
					<span className="self-center text-xl font-semibold whitespace-nowrap text-black">
						FSP
					</span>
				</Link>
				<div className="flex items-center space-x-6 rtl:space-x-reverse">
					<div className={`bg-green-600 py-2 px-2 rounded-full`}>
						<div className="text-white font-bold text-xs">{displayName}</div>
					</div>
					<button
						type="button"
						className="bg-primary text-white font-semibold text-xs px-2 py-2 rounded-md"
						onClick={handleLogout}
					>
						Logout
					</button>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
