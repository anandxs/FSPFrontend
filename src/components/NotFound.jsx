import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectCurrentUser } from "../features/auth/authSlice";

const NotFound = () => {
	const { auth } = useSelector(selectCurrentUser);

	return (
		<section className="px-4 py-24 mx-auto max-w-7xl">
			<div className="w-full mx-auto text-center lg:w-2/3">
				<h1 className="mb-4 text-6xl font-thin text-gray-900">404</h1>
				<p className="mb-3 text-xl font-bold text-gray-900 md:text-2xl">
					Oh no! We couldn’t find the page you were looking for.
				</p>
				<p className="mb-3 text-lg font-medium text-gray-700">
					The page you're looking for may have moved or no longer exists. Go
					back to the{" "}
					<Link to="/" className="underline">
						homepage
					</Link>
					.
				</p>
			</div>
		</section>
	);
};

export default NotFound;
