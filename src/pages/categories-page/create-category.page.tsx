import * as React from "react";
import { inject, observer } from "mobx-react";
import { BrowserRouterProps } from "react-router-dom";
import { FormGroup, Label, Input, Button } from "reactstrap";
import { CategoriesStore } from "../../stores/categories.store";
import { Formik, FormikProps, Form } from "formik";
import { ICategory } from "../../interfaces";
import { DifficultiesStore } from "../../stores/difficulties.store";
import { FullPageLoader } from "../../components/Loaders/FullPageLoader.component";
import { InlineLoader } from "../../components/Loaders/InlineLoader.component";

// import * as Yup from "yup";
import { Page } from "../../components/Page/Page.component";

interface Props extends BrowserRouterProps {
	difficultiesStore: DifficultiesStore;
	categoriesStore: CategoriesStore;
}

interface State {
	isLoading: boolean;
}

@inject("difficultiesStore", "categoriesStore")
@observer
export class CreateCategoryPage extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			isLoading: false
		};
	}

	componentDidMount() {
		this.fetchData();
	}

	private async fetchData() {
		await this.props.categoriesStore.init();
		await this.props.difficultiesStore.init();
		this.setState({ isLoading: false });
	}

	private onSubmit = async (category: ICategory) => {
		this.setState({ isLoading: true });
		await this.props.categoriesStore.create(category);
	};

	render() {
		const { categories } = this.props.categoriesStore;
		const { difficulties } = this.props.difficultiesStore;
		const initialValues: ICategory = {
			key: "",
			difficulties: [],
			icon: ""
		};

		// const validationSchema = Yup.object().shape({
		// 	key: Yup.string()
		// 		.min(3)
		// 		.max(64)
		// 		.required(),
		// 	difficulties: Yup.array()
		// 		.min(1)
		// 		.required(),
		// 	string: Yup.string()
		// 		.min(3)
		// 		.max(64)
		// 		.required()
		// });

		if (!categories.length || !difficulties.length) {
			return <FullPageLoader />;
		}
		return (
			<Page>
				<Page.Header title="Create Category" />
				<Page.Body>
					<Formik
						initialValues={initialValues}
						onSubmit={this.onSubmit}
						render={this.renderForm}
						// validationSchema={validationSchema}
					/>
				</Page.Body>
			</Page>
		);
	}

	private renderForm = (formikProps: FormikProps<ICategory>) => {
		return (
			<Form>
				<FormGroup>
					<Label inline={false} for="CategoryName">
						Category Name
					</Label>
					<Input
						type="text"
						name="key"
						id="CategoryName"
						placeholder="Category Name"
						onChange={formikProps.handleChange}
					/>
				</FormGroup>
				<FormGroup>
					<Label inline={false} for="CategoryIcon">
						Category Icon
					</Label>
					<Input
						type="text"
						name="icon"
						id="CategoryIcon"
						placeholder="https://google.com/icon.jpg"
						onChange={formikProps.handleChange}
					/>
				</FormGroup>
				<FormGroup>
					<Input
						type="select"
						name="difficulties"
						id="exampleSelectMulti"
						multiple
						onChange={formikProps.handleChange}
					>
						{this.props.difficultiesStore.difficulties.map(
							difficulty => {
								return (
									<option value={difficulty._id}>
										{difficulty.key}
									</option>
								);
							}
						)}
					</Input>
				</FormGroup>
				<FormGroup>
					<Button
						color={"primary"}
						onClick={formikProps.submitForm}
						disabled={this.state.isLoading}
					>
						Submit {this.state.isLoading && <InlineLoader />}
					</Button>
				</FormGroup>
			</Form>
		);
	};
}
