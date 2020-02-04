import * as React from "react";
import { QuestionCardBase, QuestionCardTitleBase } from "./QuestionCard.styled";
import { IQuestion } from "../../interfaces";
import { Collapse } from 'reactstrap';

interface Props {
	question: IQuestion;
	color: string;
	onClick(): void;
}
interface State {
	isOpen: boolean
}

export class QuestionCard extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			isOpen: false
		};
	}

	public render() {
		const { question } = this.props;
		return <QuestionCardBase color={this.props.color} onClick={() => this.setState({isOpen: !this.state.isOpen})}>
			<QuestionCardTitleBase>
				{question.question}
			</QuestionCardTitleBase>
			<Collapse isOpen={this.state.isOpen}>
				{question._id}
			</Collapse>
		</QuestionCardBase>;
	}
}
