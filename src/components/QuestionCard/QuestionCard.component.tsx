import * as React from "react";
import { QuestionCardBase, QuestionCardTitleBase } from "./QuestionCard.styled";
import { Badge } from "reactstrap";

interface Props {
	color: string;
	status?: string;
	title: string;
	onClick?(e: any): void;
}
interface State {
}

export class QuestionCard extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
		};
	}

	public render() {
		const { status, title } = this.props;
		return (
			<QuestionCardBase
				color={this.props.color}
				onClick={this.props.onClick}
			>
				<QuestionCardTitleBase>
					{title}&nbsp;
					{status && <Badge>{status}</Badge>}
				</QuestionCardTitleBase>
			</QuestionCardBase>
		);
	}
}
