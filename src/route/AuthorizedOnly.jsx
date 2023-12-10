import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/auth/authSlice";
import { Navigate, Outlet } from "react-router-dom";

const AuthorizedOnly = ({ allowedRoles }) => {
	const { role } = useSelector(selectCurrentUser);

	return role === null ? (
		<Navigate to={"/login"} />
	) : allowedRoles.includes(role) || allowedRoles.includes("All") ? (
		<Outlet />
	) : (
		<Navigate to={"/accessdenied"} />
	);
};

export default AuthorizedOnly;
