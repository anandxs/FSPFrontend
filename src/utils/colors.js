export const getColor = () => {
	const colors = ["green", "red", "orange", "pink", "blue"];

	const index = Math.floor(Math.random() * colors.length);
	console.log(index);
	console.log(colors[index]);
	return colors[index];
};
