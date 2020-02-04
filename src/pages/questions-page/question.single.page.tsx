import * as React from 'react';
import { observer, inject } from 'mobx-react';
import {} from 'react-router-dom'
import { Page } from '../../components/Page/Page.component';
import { QuestionsStore } from '../../stores/questions.store';
import { FullPageLoader } from '../../components/Loaders/FullPageLoader.component';
import { IQuestion } from '../../interfaces';

interface Props {
	match?: any;
	questionsStore?: QuestionsStore
}
interface State {
	isLoading: boolean;
	question: IQuestion | null;
	error: any;
}

@inject(
	'questionsStore'
)
@observer
export class SingleQuestionPage extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			isLoading: true,
			error: null,
			question: null
		};

	}
	
	componentWillMount() {
		this.init();
	}

	private async init() {
		const question = this.props.questionsStore!.questions.find(question => question._id === this.props.match.params.questionId);
		if (!question) {
			return this.setState({
				error: 'error'
			})
		}
		this.setState({question, isLoading: false})

	}

	private renderContent() {
		return <div>Hello!</div>
	}

	public render() {
		return <Page>
			<Page.Header title="Question: "/>
			<Page.Body>
				
				{this.state.isLoading ? <FullPageLoader /> : this.renderContent()}
			</Page.Body>
		</Page>
	}
}