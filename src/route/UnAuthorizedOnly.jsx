import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/auth/authSlice";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const UnAuthorizedOnly = () => {
	const { accessToken } = useSelector(selectCurrentUser);
	const location = useLocation();
	console.log(location);

	return accessToken === null ? (
		<Outlet />
	) : (
		<Navigate to="/load" state={{ from: location }} replace={true} />
	);
};

export default UnAuthorizedOnly;
