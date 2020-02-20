import * as React from "react";
import { inject, observer } from "mobx-react";
import { RouteComponentProps } from "react-router-dom";
import IdentityStore from "../../stores/identity.store";
import { QuestionsStore } from "../../stores/questions.store";
import { FullPageLoader } from "../../components/Loaders/FullPageLoader.component";
import { Page } from "../../components/Page/Page.component";
import { QuestionCard } from "../../components/QuestionCard/QuestionCard.component";
import { getRandomColor } from '../../utils/colorGen';

interface Props extends RouteComponentProps {
	identityStore: IdentityStore;
	questionsStore: QuestionsStore;
}

interface State {
	isLoading: boolean;
}

@inject("identityStore", "questionsStore")
@observer
export class QuestionsPage extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			isLoading: true
		};
	}

	componentDidMount() {
		this.fetchData();
	}

	private async fetchData() {
		await this.props.questionsStore.init();
		this.setState({ isLoading: false });
	}

	render() {
		const { questionsStore } = this.props;

		if (!questionsStore.questions.length) {
			return <FullPageLoader />;
		}
		return (
			<Page>
				<Page.Header title="Questions" />
				<Page.Body>
					<div className="d-flex flex-wrap">
						{questionsStore.questions.map(question => (
							<QuestionCard
								onClick={() => this.props.history.push(`/questions/${question._id}`)}
								color={getRandomColor()}
								key={question._id}
								title={question.question}
								status={questionsStore.calculateStatusString(question.status!)}
							/>
						))}
					</div>
				</Page.Body>
			</Page>
		);
	}
}
