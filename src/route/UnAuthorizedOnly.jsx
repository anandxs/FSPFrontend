import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/auth/authSlice";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const UnAuthorizedOnly = () => {
	const { role } = useSelector(selectCurrentUser);
	const location = useLocation();

	return role === null ? (
		<Outlet />
	) : role === "USER" ? (
		<Navigate to="/" state={{ from: location }} replace={true} />
	) : (
		<Navigate to="/admin" />
	);
};

export default UnAuthorizedOnly;
