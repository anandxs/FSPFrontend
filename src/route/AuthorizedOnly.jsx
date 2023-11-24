import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/auth/authSlice";
import { Navigate, Outlet } from "react-router-dom";

const AuthorizedOnly = () => {
	const { accessToken } = useSelector(selectCurrentUser);

	return accessToken !== null ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthorizedOnly;
