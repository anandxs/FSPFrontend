import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/auth/authSlice";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const UnAuthorizedOnly = () => {
	const { accessToken } = useSelector(selectCurrentUser);
	const location = useLocation();

	return accessToken === null ? (
		<Outlet />
	) : (
		<Navigate to="/" state={{ from: location }} replace={true} />
	);
};

export default UnAuthorizedOnly;
