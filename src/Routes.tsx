import * as React from "react";
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect
} from "react-router-dom";

import { observer, inject } from "mobx-react";
import { LoginPage } from "./pages/login-page/login.page";
import { HomePage } from "./pages/homepage/home.page";
import IdentityStore from "./stores/identity.store";
import { HeaderContainer } from './components/Header/Header.component';
import { IUser } from './interfaces';
import { QuestionsPage } from './pages/questions-page/questions.page';
import { CategoriesPage } from './pages/categories-page/categories.page';
// import { SideNav } from "./components/Navbar/SideNav";
// import { ProgramsPage } from "./pages/protected/programs-page/programs.page";
// import { SettingsPage } from "./pages/protected/settings-page/settings.page";
// import { UsersPage } from "./pages/protected/users-page/users.page";

const DefaultContainer: React.FC<{ isLoggedIn: boolean, user: IUser | null }> = props => {
	const { isLoggedIn, user } = props;

	if (!isLoggedIn || !user) {
		return <Redirect to="/login" />;
	}
	return (
		<main style={{ height: "100%" }}>
				<HeaderContainer user={user} />
			<div
				style={{
					display: "inline-block",
					position: "absolute",
					width: "84%",
					height: "100%"
				}}
			>
				<Switch>
					<Route path="/" exact component={HomePage} />
					<Route path="/questions" exact component={QuestionsPage} />
					<Route path="/categories" exact component={CategoriesPage} />
					<Route path="/" component={HomePage} />
				</Switch>
			</div>
		</main>
	);
};

interface Props {
	identityStore?: IdentityStore;
}

@inject("identityStore")
@observer
export default class Routes extends React.Component<Props, {}> {
	constructor(props: Props) {
		super(props);

		this.state = {};
	}
	render() {
		const { identityStore } = this.props;

		const isLoggedIn = identityStore!.isLoggedIn;
		const user = identityStore!.user;

		return (
			<Router>
				<Switch>
					<Route path="/login" component={LoginPage} />
					<Route
						component={() => (
							<DefaultContainer isLoggedIn={isLoggedIn} user={user} />
						)}
					/>
				</Switch>
			</Router>
		);
	}
}
