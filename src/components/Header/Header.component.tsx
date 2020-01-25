import * as React from 'react';
import { IUser } from '../../interfaces';
import { Navbar, NavbarBrand, NavbarToggler, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Collapse, NavbarText } from 'reactstrap';

import './Header.component.scss';

interface Props {
	user: IUser;
}

interface State {
	isOpen: boolean
}

export class HeaderContainer extends React.Component <Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			isOpen: false
		};
	}

	render() {
		return (
			<header>
				<Navbar color="dark" dark expand="md">
					<NavbarBrand href="/">IceBreaker Backoffice</NavbarBrand>
					<NavbarToggler onClick={() => this.setState({isOpen: !this.state.isOpen})} />
					<Collapse isOpen={this.state.isOpen} navbar>
						<Nav className="mr-auto" navbar>
							<UncontrolledDropdown nav inNavbar>
								<DropdownToggle nav caret>
									Questions
								</DropdownToggle>
								<DropdownMenu right>
									<DropdownItem>View</DropdownItem>
									<DropdownItem>Create</DropdownItem>
								</DropdownMenu>
							</UncontrolledDropdown>
							<UncontrolledDropdown nav inNavbar>
								<DropdownToggle nav caret>
									Categories
								</DropdownToggle>
								<DropdownMenu right>
									<DropdownItem>View</DropdownItem>
									<DropdownItem>Create</DropdownItem>
								</DropdownMenu>
							</UncontrolledDropdown>
						</Nav>
						<NavbarText>{this.props.user.email}</NavbarText>
					</Collapse>
				</Navbar>
			</header>
		);
	}
}