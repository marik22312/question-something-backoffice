import styled from 'styled-components';



export const QuestionCardBase = styled.div`
	width: 90%;
	height: 100%;
	background-color: ${({color}) => color};
	box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.3);
	margin: auto;
	margin-top: 25px;
	padding: 25px;
	border-radius: 10px;

	transition: all .3s ease-out;
	
	&:hover {
		box-shadow: 6px 6px 10px rgba(0, 0, 0, 0.3);
		cursor: pointer;

		transform: scale(1.01);
	}
`;

export const QuestionCardTitleBase = styled.h1`
	mix-blend-mode: difference;
`;