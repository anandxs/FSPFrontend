import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/auth/authSlice";
import { Navigate, Outlet } from "react-router-dom";
import { ALL_AUTHENTICATED } from "../utils/constants";

const AuthorizedOnly = ({ allowedRoles }) => {
	const { role } = useSelector(selectCurrentUser);

	return role === null ? (
		<Navigate to="/login" />
	) : allowedRoles.includes(ALL_AUTHENTICATED) ||
	  allowedRoles.includes(role) ? (
		<Outlet />
	) : (
		<Navigate to="/denied" />
	);
};

export default AuthorizedOnly;
