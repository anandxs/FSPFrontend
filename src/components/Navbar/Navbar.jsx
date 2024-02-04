import { useDispatch, useSelector } from "react-redux";
import { logOut, selectCurrentUser } from "../../features/auth/authSlice";
import { Link } from "react-router-dom";
import { useLogOutMutation } from "../../features/auth/authApiSlice";
import { apiSlice } from "../../app/api/apiSlice";
import ProfilePicAlternative from "../Profile/ProfilePicAlternative";

const Navbar = () => {
	const [logOutUser, { isLoading }] = useLogOutMutation();
	const dispatch = useDispatch();

	const auth = useSelector(selectCurrentUser);

	const handleLogout = () => {
		const { accessToken, refreshToken } = auth;
		const body = {
			accessToken,
			refreshToken,
		};
		try {
			logOutUser({ body }).unwrap();
			dispatch(logOut());
			dispatch(apiSlice.util.resetApiState());
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<nav className="bg-accent border-b-2 border-b-shadow">
			<div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-2">
				<Link
					to={auth?.role === "USER" ? "/" : "/admin"}
					className="flex items-center space-x-3 rtl:space-x-reverse"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						className="w-5 h-5"
					>
						<path
							fillRule="evenodd"
							d="M9 1.5H5.625c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5Zm6.61 10.936a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 14.47a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
							clipRule="evenodd"
						/>
						<path d="M12.971 1.816A5.23 5.23 0 0 1 14.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 0 1 3.434 1.279 9.768 9.768 0 0 0-6.963-6.963Z" />
					</svg>
					<span className="self-center text-xl font-semibold whitespace-nowrap text-black">
						Sync
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
						className="inline-block rounded bg-blue-600 px-5 py-2 text-xs font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-blue-500 disabled:opacity-50"
						onClick={handleLogout}
						disabled={isLoading}
					>
						{isLoading ? "Loading..." : "Logout"}
					</button>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
