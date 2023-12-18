import { useEffect, useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { selectCurrentUser } from "../../features/auth/authSlice";

const ProfilePicAlternative = () => {
	const { name } = useSelector(selectCurrentUser);
	const [displayName, setDisplayName] = useState("");

	useEffect(() => {
		let temp = "";
		name?.split(" ").forEach((w) => {
			temp += w[0];
		});
		setDisplayName(temp.toUpperCase());
	}, [name]);

	return <>{displayName}</>;
};

export default ProfilePicAlternative;
