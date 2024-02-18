export const getColor = () => {
	const colors = ["green", "red", "orange", "pink", "blue"];
	const index = Math.floor(Math.random() * colors.length);
	return colors[index];
};
