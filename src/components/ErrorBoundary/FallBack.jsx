import { useEffect } from "react";

const FallBack = ({ error }) => {
	useEffect(() => {
		console.log(error);

		return () => {};
	}, []);

	return (
		<section className="px-4 py-24 mx-auto max-w-7xl">
			<div className="w-full mx-auto text-center lg:w-2/3">
				<h1 className="mb-4 text-6xl font-thin text-gray-900">500</h1>
				<p className="mb-3 text-xl font-bold text-gray-900 md:text-2xl">
					Sorry, something went wrong.
				</p>
				<p className="mb-3 text-lg font-medium text-gray-700">
					Try again in 30 minutes.
					<a href="http://127.0.0.1:5173/login"> Click here to go to login</a>.
				</p>
			</div>
		</section>
	);
};

export default FallBack;
