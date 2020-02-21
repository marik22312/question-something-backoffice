import * as React from "react";
import { observer, inject } from "mobx-react";
import {} from "react-router-dom";
import { Page } from "../../components/Page/Page.component";
import { QuestionsStore } from "../../stores/questions.store";
import { FullPageLoader } from "../../components/Loaders/FullPageLoader.component";
import { IQuestion, ICategory, IDifficulty } from "../../interfaces";
import { Tag } from "../../components/Tags/Tag.component";
import {
	Dropdown,
	DropdownMenu,
	DropdownItem,
	DropdownToggle,
	Button,
	Badge
} from "reactstrap";
import { CategoriesStore } from "../../stores/categories.store";
import { DifficultiesStore } from "../../stores/difficulties.store";

interface Props {
	match?: any;
	questionsStore?: QuestionsStore;
	categoriesStore?: CategoriesStore;
	difficultiesStore?: DifficultiesStore;
}
interface State {
	isLoading: boolean;
	question: IQuestion | null;
	isModified: boolean;
	error: any;
	openDropdown: string;
}

@inject("questionsStore", "categoriesStore", "difficultiesStore")
@observer
export class SingleQuestionPage extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			isLoading: true,
			error: null,
			question: null,
			isModified: false,
			openDropdown: ""
		};
	}

	componentWillMount() {
		this.init();
	}

	private openDropdown(key: string) {
		if (this.state.openDropdown === key) {
			return this.setState({ openDropdown: "" });
		}
		this.setState({
			openDropdown: key
		});
	}

	private async init() {
		const {
			categoriesStore,
			questionsStore,
			difficultiesStore
		} = this.props;

		const response = await questionsStore?.getById(
			this.props.match.params.questionId
		);
		if (!categoriesStore?.categories.length) {
			await categoriesStore?.init();
		}
		if (!difficultiesStore?.difficulties.length) {
			await difficultiesStore?.init();
		}

		if (!response) {
			return this.setState({
				error: "error"
			});
		}

		const question = response?.question;
		this.setState({ question, isLoading: false });
	}

	private canPublish() {
		const { question, isModified } = this.state;
		return !!question?.categories.length && !!question.difficulties.length && !isModified;
	}

	private async onSave() {
		this.setState({
			isModified: false
		});

		const question = await this.props.questionsStore?.update(this.state.question!);

		this.setState({
			question: question!.question,
			isModified: false
		})
	}

	private addCategory(category: ICategory) {
		const question: IQuestion = { ...(this.state.question as IQuestion) };
		question.categories.push(category);
		this.setState({ question, isModified: true });
	}

	private addDifficulty(difficulty: IDifficulty) {
		const question: IQuestion = { ...(this.state.question as IQuestion) };
		question.difficulties.push(difficulty);
		this.setState({ question, isModified: true });
	}

	private filterCategories(category: ICategory) {
		return !this.state.question?.categories.includes(category)
	}
	private filterDifficulties(difficulty: IDifficulty) {
		return !this.state.question?.difficulties.includes(difficulty)
	}

	private renderContent() {
		const { question } = this.state;
		if (this.state.isLoading || !question) {
			return <FullPageLoader />;
		}

		return (
			<React.Fragment>
				<div className="mt-2">
					<h2>Categories:</h2>
				</div>
				<div>
					{question.categories.map(category => (
						<Tag key={category._id}>{category.key}</Tag>
					))}
					<Dropdown
						isOpen={this.state.openDropdown === "CATEGORIES"}
						toggle={() => this.openDropdown("CATEGORIES")}
						className="d-inline-block"
					>
						<DropdownToggle caret>Add Category</DropdownToggle>
						<DropdownMenu>
							{this.props.categoriesStore?.categories.filter(category => this.filterCategories(category)).map(
								category => (
									<DropdownItem
										key={category._id}
										onClick={() =>
											this.addCategory(category)
										}
									>
										{category.key}
									</DropdownItem>
								)
							)}
						</DropdownMenu>
					</Dropdown>
				</div>
				<div className="mt-2">
					<h2>Difficulties:</h2>
				</div>
				<div>
					{question.difficulties.map(difficulty => (
						<Tag key={difficulty._id}>{difficulty.key}</Tag>
					))}
					<Dropdown
						isOpen={this.state.openDropdown === "DIFFICULTIES"}
						toggle={() => this.openDropdown("DIFFICULTIES")}
						className="d-inline-block"
					>
						<DropdownToggle caret>Add Difficulty</DropdownToggle>
						<DropdownMenu>
							{this.props.difficultiesStore?.difficulties.filter(difficulty => this.filterDifficulties(difficulty)).map(
								difficulty => (
									<DropdownItem
										key={difficulty._id}
										onClick={() =>
											this.addDifficulty(difficulty)
										}
									>
										{difficulty.key}
									</DropdownItem>
								)
							)}
						</DropdownMenu>
					</Dropdown>
				</div>
				<div className="mt-5 d-flex justify-content-left">
					<div className="mr-2">
					<Button disabled={!this.state.isModified} onClick={() => this.onSave()}>Save</Button>
					</div>
					<div className="mr-2">
					<Button disabled={!this.canPublish()}>Publish</Button>
					</div>
				</div>
			</React.Fragment>
		);
	}

	private getTitle(): any {
		const { question } = this.state;

		if (!question) {
			return 'Loading...';
		}

		return <React.Fragment>
			{question.question}&nbsp;<Badge>{this.props.questionsStore?.calculateStatusString(question.status!)}</Badge>
		</React.Fragment>

	}

	public render() {
		return (
			<Page>
				<Page.Header
					title={this.getTitle()}
				/>
				<Page.Body>{this.renderContent()}</Page.Body>
			</Page>
		);
	}
}
