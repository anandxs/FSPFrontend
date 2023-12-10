import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/auth/authSlice";
import { Navigate, Outlet } from "react-router-dom";

const UnAuthorizedOnly = () => {
	const { accessToken } = useSelector(selectCurrentUser);

	return accessToken === null ? <Outlet /> : <Navigate to={"/"} />;
};

export default UnAuthorizedOnly;
