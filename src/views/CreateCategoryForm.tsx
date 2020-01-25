import * as React from "react";
import { ICategory } from '../interfaces';


interface Props {
	categories: ICategory[];
	isLoading: boolean;
}
export class CreateCategoryForm extends React.Component<Props, { isLoading: boolean }> {
  constructor(props: Props) {
    super(props);
    this.state = {
	  isLoading: false,
    };
  }

  render() {

	if (this.props.isLoading) {
		return <div>Loading...</div>
	}
    return <div>
		{this.props.categories.map(category => {
			return (
			<div>{category.key}</div>
			)
		})}
	</div>;
  }
}
