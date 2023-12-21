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
		const promise = verifyEmail({ code, userId });
		promise
			.unwrap()
			.then(() => {})
			.catch((err) => {
				console.log(err);
			});

		return function () {
			promise.abort();
		};
	}, []);

	return (
		<section className="flex flex-col items-center justify-center h-full">
			{isLoading && <p>Loading..</p>}
			{isSuccess && (
				<>
					<p>Your email has been verified</p>
					<p>
						Click{" "}
						<Link className="underline" to={"/login"}>
							here
						</Link>{" "}
						to login
					</p>
				</>
			)}
			{isError && <p>Something went wrong. Please try again later.</p>}
		</section>
	);
};

export default EmailVerified;
