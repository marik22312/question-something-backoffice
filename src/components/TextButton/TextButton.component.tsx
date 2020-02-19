import * as React from 'react';
import { TextButtonBase } from './TextButton.styled';

interface Props {
	onClick?(e: any): void
}

interface State {}

export class TextButton extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {};
	}

	public render() {
		return <React.Fragment>
			<TextButtonBase onClick={this.props.onClick}>{this.props.children}</TextButtonBase>
		</React.Fragment>
	}

}