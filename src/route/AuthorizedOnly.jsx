import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/auth/authSlice";
import { Navigate, Outlet } from "react-router-dom";

const AuthorizedOnly = ({ allowedRoles }) => {
	const { accessToken, role } = useSelector(selectCurrentUser);
	console.log(allowedRoles);

	return accessToken === null ? (
		<Navigate to="/login" />
	) : allowedRoles.includes(role) ? (
		<Outlet />
	) : (
		<Navigate to="/denied" />
	);
};

export default AuthorizedOnly;
