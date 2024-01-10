import { useNavigate, useSearchParams } from "react-router-dom";
import { useAcceptInviteMutation } from "../features/member/memberApiSlice";
import { useEffect } from "react";

const AcceptInvite = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [acceptInviteAsync] = useAcceptInviteMutation();
	const navigate = useNavigate();

	useEffect(() => {
		const projectId = searchParams.get("projectId");
		const promise = acceptInviteAsync({ projectId });
		promise
			.unwrap()
			.then((response) => {
				navigate(`/projects/${projectId}/tasks`);
			})
			.catch((err) => {
				console.log(err);
				navigate("/");
			});

		return function () {
			promise.abort();
		};
	}, []);

	return <div>Loading...</div>;
};

export default AcceptInvite;
