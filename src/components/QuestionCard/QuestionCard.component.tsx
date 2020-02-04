import * as React from "react";
import { QuestionCardBase, QuestionCardTitleBase } from "./QuestionCard.styled";
import { IQuestion } from "../../interfaces";

interface Props {
	question: IQuestion;
	onClick(): void;
}
interface State {}

export class QuestionCard extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {};
	}

	public render() {
		const { question } = this.props;
		return <QuestionCardBase color={getRandomColor()} onClick={this.props.onClick}>
			<QuestionCardTitleBase>
				{question.question}
			</QuestionCardTitleBase>
		</QuestionCardBase>;
	}
}

const colors = ['#6e5773', '#d45d79','#ea9085','#e9e2d0', '#f67280', '#c06c84', '#6c5b7b', '#35477d'];

const getRandomColor = (): string => {
	const number = Math.floor(Math.random() * colors.length);
	return colors[number];
}
