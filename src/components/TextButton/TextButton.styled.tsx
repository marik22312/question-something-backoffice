import styled from 'styled-components';

export const TextButtonBase = styled.button`
	background: none;
	border: none;
	display: inline-block;
    padding: 2px 5px;
	margin-right: 5px;

	&:hover {
		color: rgba(0, 0, 0, 0.5);
	}

	&:focus, &::selection {
		border: none;
		outline: none;
	}
`;