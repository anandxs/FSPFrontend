import { useSelector } from "react-redux";
import { selectCurrentProjectRole } from "../features/user/userSlice";
import { Navigate, Outlet } from "react-router-dom";

const ProjectAdminOnly = () => {
	const { role } = useSelector(selectCurrentProjectRole);

	return role?.name !== "ADMIN" ? <Navigate to={`notfound`} /> : <Outlet />;
};

export default ProjectAdminOnly;
