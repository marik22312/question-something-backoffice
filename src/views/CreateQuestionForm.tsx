import * as React from 'react';

export class CreateQuestionForm extends React.Component {
	constructor(props: any) {
		super(props);
		this.state = {
			isLoading: false
		};
	}

	render() {
		return (
			<div>Question Submission Form!</div>
		)
	}
}