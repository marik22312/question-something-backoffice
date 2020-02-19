import * as React from "react";
import { IUser } from "../../interfaces";
import {
	Navbar,
	NavbarBrand,
	NavbarToggler,
	Nav,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	Collapse,
	NavbarText,
} from "reactstrap";

import "./Header.component.scss";
import { Link as RouterLink } from "react-router-dom";

interface Props {
	user: IUser;
	logout(): void;
}

interface State {
	isOpen: boolean;
}

export class HeaderContainer extends React.Component<Props, State> {
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
					<NavbarBrand to="/" tag={RouterLink}>
						IceBreaker Backoffice
					</NavbarBrand>
					<NavbarToggler
						onClick={() =>
							this.setState({ isOpen: !this.state.isOpen })
						}
					/>
					<Collapse isOpen={this.state.isOpen} navbar>
						<Nav className="mr-auto" navbar>
							<UncontrolledDropdown nav inNavbar>
								<DropdownToggle nav caret>
									Questions
								</DropdownToggle>
								<DropdownMenu right>
									<DropdownItem
										to="/questions"
										tag={RouterLink}
									>
										View
									</DropdownItem>
									<DropdownItem
										to="/questions/createbulk"
										tag={RouterLink}
									>
										Bulk Create
									</DropdownItem>
								</DropdownMenu>
							</UncontrolledDropdown>
							<UncontrolledDropdown nav inNavbar>
								<DropdownToggle nav caret>
									Categories
								</DropdownToggle>
								<DropdownMenu right>
									<DropdownItem>View</DropdownItem>
									<DropdownItem
										to="/categories/create"
										tag={RouterLink}
									>
										Create
									</DropdownItem>
								</DropdownMenu>
							</UncontrolledDropdown>
						</Nav>
						<NavbarText>{this.props.user.email}</NavbarText>
						{/* <Button style={{marginLeft: '10px'}} color="danger" onClick={this.props.logout}>Logout!</Button> */}
					</Collapse>
				</Navbar>
			</header>
		);
	}
}
