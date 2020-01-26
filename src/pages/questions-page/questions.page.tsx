import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { BrowserRouterProps } from 'react-router-dom';
import IdentityStore from '../../stores/identity.store';
import { Container, Row, Col } from 'reactstrap';
import { QuestionsStore } from '../../stores/questions.store';

interface Props extends BrowserRouterProps {
	identityStore: IdentityStore;
	questionsStore: QuestionsStore;
}

interface State {
	isLoading: boolean;
}

@inject(
	'identityStore',
	'questionsStore'
	)
@observer
export class QuestionsPage extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			isLoading: true
		}
	}

	componentDidMount() {
		this.fetchData();
	}

	private async fetchData() {
		await this.props.questionsStore.init();
		this.setState({isLoading: false})
	}


	render() {
		console.log(this.props.questionsStore)
		const { questions } = this.props.questionsStore

		if (!questions.length) {
			return <div>Loading</div>
		}
		return (
			<React.Fragment>
				<Container>
					<Row>
						<Col xs={12}>
							Hello Questions
						</Col>
					</Row>
					<Row>
						<Col xs={12}>
							<ul>
							{questions.map(question => {
								return <li key={question._id}>{question.question}</li>
							})}
							</ul>
						</Col>
					</Row>
				</Container>
			</React.Fragment>
		)
	}
}