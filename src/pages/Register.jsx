import { useState } from "react";
import Register from "../components/Register";
import RegisterSuccess from "../components/RegisterSuccess";

const RegisterPage = () => {
	const [regSuccess, setRegSuccess] = useState(false);

	return !regSuccess ? (
		<Register setRegSuccess={setRegSuccess} />
	) : (
		<RegisterSuccess />
	);
};

export default RegisterPage;
