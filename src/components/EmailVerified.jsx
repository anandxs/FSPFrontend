import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useVerifyEmailMutation } from "../features/auth/authApiSlice";

const EmailVerified = () => {
	const [searchParams] = useSearchParams();
	const code = searchParams.get("code");
	const userId = searchParams.get("userid");

	const [verifyEmail, { isLoading, isSuccess, isError }] =
		useVerifyEmailMutation();

	useEffect(() => {
		verifyEmail({ code, userId })
			.unwrap()
			.then(() => {})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<section>
			{isLoading && <p>Loading..</p>}
			{isSuccess && (
				<>
					<p>Your email has been verified</p>
					<p>
						Click <Link to={"/login"}>here</Link> to login
					</p>
				</>
			)}
			{isError && <p>Something went wrong. Please try again later.</p>}
		</section>
	);
};

export default EmailVerified;
