import { useNavigate } from "react-router-dom";

const AccessDenied = () => {
	const navigate = useNavigate();

	const goBack = () => {
		navigate(-2);
	};

	return (
		<section className="w-full h-full flex flex-col justify-center items-center">
			<h1 className="text-3xl font-bold text-orange-600">Access Denied</h1>
			<p>You do not have rights to access this page!</p>
			<button
				type="button"
				onClick={goBack}
				className="bg-primary px-2 py-1 rounded text-white font-semibold mt-1"
			>
				Go Back
			</button>
		</section>
	);
};

export default AccessDenied;
