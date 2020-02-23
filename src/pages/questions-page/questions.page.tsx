import * as React from "react";
import { inject, observer } from "mobx-react";
import { RouteComponentProps } from "react-router-dom";
import IdentityStore from "../../stores/identity.store";
import { QuestionsStore } from "../../stores/questions.store";
import { FullPageLoader } from "../../components/Loaders/FullPageLoader.component";
import { Page } from "../../components/Page/Page.component";
import { QuestionCard } from "../../components/QuestionCard/QuestionCard.component";
import { getRandomColor } from '../../utils/colorGen';
import SearchIcon from '@material-ui/icons/Search';
import debounce from 'lodash/debounce';

import { InputGroup,
	InputGroupAddon,
	InputGroupText,
	Input } from 'reactstrap'
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

	private onSearchChange(text: string) {
		const { questionsStore } = this.props;
		questionsStore.search(text)

	}

	private renderSearchBar() {
		return (
			<InputGroup>
			<InputGroupAddon addonType="prepend">
			  <InputGroupText><SearchIcon/></InputGroupText>
			</InputGroupAddon>
			<Input placeholder="Search" onChange={e => this.onSearchChange(e.currentTarget.value)}/>
		  </InputGroup>
		)
	}

	render() {
		const { questionsStore } = this.props;

		if (this.state.isLoading) {
			return <FullPageLoader />;
		}
		return (
			<Page>
				<Page.Header title="Questions" />
				<Page.Body>
					<div>
					{this.renderSearchBar()}
					</div>
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
