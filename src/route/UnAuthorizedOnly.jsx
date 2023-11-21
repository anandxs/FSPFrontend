import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/auth/authSlice";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const UnAuthorizedOnly = () => {
	const { id } = useSelector(selectCurrentUser);
	const location = useLocation();

	return id === null ? (
		<Outlet />
	) : (
		<Navigate to="/" state={{ from: location }} replace={true} />
	);
};

export default UnAuthorizedOnly;
