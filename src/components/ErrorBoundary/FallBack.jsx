import { useEffect } from "react";

const FallBack = ({ error }) => {
	useEffect(() => {
		console.log(error);

		return () => {};
	}, []);

	return (
		<div className="h-full w-full flex flex-col justify-center items-center">
			<p>Something went wrong. Application crashed.</p>
			<a href="http://127.0.0.1:5173/login">Click here to go to login</a>
		</div>
	);
};

export default FallBack;
