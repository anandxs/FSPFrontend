import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/auth/authSlice";
import { Navigate, Outlet } from "react-router-dom";

const AuthorizedOnly = () => {
	const { id } = useSelector(selectCurrentUser);

	return id !== null ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthorizedOnly;
