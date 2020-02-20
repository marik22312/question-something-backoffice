const colors = ['#525252', '#414141', '#313131'];

export const getRandomColor = (): string => {
	const number = Math.floor(Math.random() * colors.length);
	return colors[number];
}