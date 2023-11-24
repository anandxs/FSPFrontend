import { useDispatch } from "react-redux";
import { logOut, setCredentials } from "../../features/auth/authSlice";
import { Link } from "react-router-dom";
import { unsetProject } from "../../features/project/projectSlice";
import {
	useGetUserInfoQuery,
	useLogOutMutation,
} from "../../features/auth/authApiSlice";
import { useEffect } from "react";

const Navbar = () => {
	const [logOutUser, { isLoading }] = useLogOutMutation();
	const { data, isSuccess, isError } = useGetUserInfoQuery();

	const dispatch = useDispatch();

	useEffect(() => {
		if (isSuccess) {
			const { id, email, firstName, lastName } = data;
			const name = `${firstName} ${lastName}`;
			dispatch(
				setCredentials({
					id,
					email,
					name,
				})
			);
		} else if (isError) {
			dispatch(logOut());
		}
	}, []);

	const handleLogout = async () => {
		try {
			await logOutUser();
			dispatch(logOut());
			dispatch(unsetProject());
		} catch (err) {
			console.log(err);
		}
	};

	return isLoading ? (
		<p>Loading...</p>
	) : (
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
						<div className="text-white font-bold text-xs">{"placeholder"}</div>
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
