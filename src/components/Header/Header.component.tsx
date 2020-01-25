import * as React from 'react';
import { IUser } from '../../interfaces';

import './Header.component.scss';

interface Props {
	user: IUser;
}

interface State {}

export class HeaderContainer extends React.Component <Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<header>
				<div className="header-container">
					<div className="user-info">
						<p className="user-email">Connected as {this.props.user.email}</p>
					</div>
				</div>
			</header>
		)
	}
}