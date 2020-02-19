import * as React from "react";
import { PageBase, PageHeaderBase, PageTitleBase, PageContentBase } from "./Page.styled";

interface Props {}
interface State {}
interface PageHeaderProps {
	title: string | React.FC;
}

export class Page extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {};
	}

	public static Header: React.FC<PageHeaderProps> = (props: PageHeaderProps) => {
		return (
			<PageHeaderBase>
				<PageTitleBase>{props.title}</PageTitleBase>
			</PageHeaderBase>
		);
	};
	public static Body: React.FC<{}> = (props: any) => {
		return (
			<PageContentBase>{props.children}</PageContentBase>
		);
	};

	public render() {
		return <PageBase>{this.props.children}</PageBase>;
	}
}
