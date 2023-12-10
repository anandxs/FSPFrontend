import { useDispatch, useSelector } from "react-redux";
import { logOut, selectCurrentUser } from "../../features/auth/authSlice";
import { Link } from "react-router-dom";
import { useLogOutMutation } from "../../features/auth/authApiSlice";
import ProfilePicAlternative from "../Profile/ProfilePicAlternative";
import { apiSlice } from "../../app/api/apiSlice";

const Navbar = () => {
	const [logOutUser, { isLoading }] = useLogOutMutation();
	const dispatch = useDispatch();

	const auth = useSelector(selectCurrentUser);

	const handleLogout = () => {
		logOutUser()
			.unwrap()
			.then(() => {
				dispatch(logOut());
				dispatch(apiSlice.util.resetApiState());
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return isLoading ? (
		<p>Loading...</p>
	) : (
		<nav className="bg-accent border-b-2 border-b-shadow">
			<div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-2">
				<Link
					to={auth?.role === "USER" ? "/" : "/admin"}
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
					<Link to="/profile/details">
						<div className={`bg-green-600 py-2 px-2 rounded-full`}>
							<div className="text-white font-bold text-xs">
								<ProfilePicAlternative />
							</div>
						</div>
					</Link>
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
