const colors = ['#6e5773', '#d45d79','#ea9085','#e9e2d0', '#f67280', '#c06c84', '#6c5b7b', '#35477d'];

export const getRandomColor = (): string => {
	const number = Math.floor(Math.random() * colors.length);
	return colors[number];
}