import { useGetUserInfoQuery } from "../../features/auth/authApiSlice";
import { useDispatch, useSelector } from "react-redux";
import {
	selectCurrentUser,
	setCredentials,
} from "../../features/auth/authSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoadUser = () => {
	const user = useSelector(selectCurrentUser);
	const { data, isSuccess } = useGetUserInfoQuery();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		if (isSuccess) {
			dispatch(
				setCredentials({
					id: data?.id,
					name: `${data?.firstName} ${data?.lastName}`,
				})
			);
			navigate("/");
		}
	}, [isSuccess]);

	return <>Loading...</>;
};

export default LoadUser;
