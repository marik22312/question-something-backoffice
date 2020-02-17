import * as React from "react";
import { inject, observer } from "mobx-react";
import { BrowserRouterProps } from "react-router-dom";
import IdentityStore from "../../stores/identity.store";
import { QuestionsStore } from "../../stores/questions.store";
import { Page } from "../../components/Page/Page.component";

import CSV from 'csvtojson';
import { DifficultiesStore } from '../../stores/difficulties.store';
import { CategoriesStore } from '../../stores/categories.store';
import { IQuestion } from '../../interfaces';
import { QuestionsPage } from './questions.page';
import { FullPageLoader } from '../../components/Loaders/FullPageLoader.component';

interface Props extends BrowserRouterProps {
	identityStore: IdentityStore;
	questionsStore: QuestionsStore;
	difficultiesStore: DifficultiesStore;
	categoriesStore: CategoriesStore;
}

interface State {
	isLoading: boolean;
	questions: any[]
}

@inject("identityStore", "questionsStore","difficultiesStore", "categoriesStore")
@observer
export class CreateQuestionPage extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			isLoading: false,
			questions: []
		};
	}

	private async transformCSV(event: string) {

		const text = await CSV({
			noheader: false,
			output: "csv"
		})
		.fromString(event);

		const questionsDto = text.map(question => ({
			question: question[0]
		}));
		return questionsDto
	}

	private async handleChange(event: any) {
		const fileText = await event.target.files[0].text();

		const questions = await this.transformCSV(fileText);
		this.setState({
			questions
		})

	}

	private async onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		this.setState({isLoading: true});

		const { questions } = this.state;

		const response = await this.props.questionsStore.BulkCreate(questions);
		console.log(response);
	}

	render() {

		return (
			<Page>
				<Page.Header title="Questions" />
				<Page.Body>
					<div className="d-flex flex-wrap">
						<form onSubmit={(e) => this.onSubmit(e)}>
							<input type="file" onChange={(e) => this.handleChange(e)} />
							{!!this.state.questions.length && <input type="submit" />}
						</form>
					</div>
					<div>
						{this.state.isLoading ? <FullPageLoader /> : this.state.questions.map(question => {
							return (
								<div key={question.question}>
									{question.question}
								</div>
							)
						})}
					</div>
				</Page.Body>
			</Page>
		);
	}
}
