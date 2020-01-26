import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { BrowserRouterProps } from 'react-router-dom';
import IdentityStore from '../../stores/identity.store';
import { Container, Row, Col } from 'reactstrap';

interface Props extends BrowserRouterProps {
	identityStore: IdentityStore
}

interface State {
	isLoading: boolean;
}

@inject('identityStore')
@observer
export class CategoriesPage extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			isLoading: true
		}
	}

	render() {
		return (
			<React.Fragment>
				<Container>
					<Row>
						<Col xs={12}>
							Hello Categories!
						</Col>
					</Row>
				</Container>
			</React.Fragment>
		)
	}
}