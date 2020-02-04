import * as React from "react";
import { inject, observer } from "mobx-react";
import { BrowserRouterProps } from "react-router-dom";
import IdentityStore from "../../stores/identity.store";
import { QuestionsStore } from "../../stores/questions.store";
import { FullPageLoader } from "../../components/Loaders/FullPageLoader.component";
import { Page } from "../../components/Page/Page.component";
import { QuestionCard } from "../../components/QuestionCard/QuestionCard.component";
import { getRandomColor } from '../../utils/colorGen';

interface Props extends BrowserRouterProps {
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
		const { questions } = this.props.questionsStore;

		if (!questions.length) {
			return <FullPageLoader />;
		}
		return (
			<Page>
				<Page.Header title="Questions" />
				<Page.Body>
					<div className="d-flex flex-wrap">
						{questions.map(question => (
							<QuestionCard
								color={getRandomColor()}
								key={question._id}
								question={question}
							/>
						))}
					</div>
				</Page.Body>
			</Page>
		);
	}
}
