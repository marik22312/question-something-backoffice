import * as React from 'react';
import { TagBase } from './Tag.styled';

interface Props {
	onClick?(e: any): void
}

interface State {}

export class Tag extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {};
	}

	public render() {
		return <React.Fragment>
			<TagBase onClick={this.props.onClick}>{this.props.children}</TagBase>
		</React.Fragment>
	}

}