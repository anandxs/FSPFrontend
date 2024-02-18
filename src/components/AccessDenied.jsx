import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectCurrentUser } from "../features/auth/authSlice";

const AccessDenied = () => {
	const auth = useSelector(selectCurrentUser);

	const navigate = useNavigate();

	const goBack = () => {
		switch (auth?.role) {
			case "USER":
				navigate("/");
				break;
			case "SUPERADMIN":
				navigate("/admin");
				break;
			default:
				navigate("/login");
				break;
		}
	};

	return (
		<section className="w-full h-full flex flex-col justify-center items-center">
			<h1 className="text-3xl font-bold text-orange-600">Access Denied</h1>
			<p>You do not have rights to access this page!</p>
			<button
				type="button"
				onClick={goBack}
				className="bg-indigo-700 px-2 py-1 rounded text-gray-50 font-semibold mt-1"
			>
				Go Back
			</button>
		</section>
	);
};

export default AccessDenied;
