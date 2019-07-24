import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Header from './Header';
import StreamList from './streams/StreamList';
import StreamDelete from './streams/StreamDelete';
import StreamCreate from './streams/StreamCreate';
import StreamEdit from './streams/StreamEdit';
import StreamShow from './streams/StreamShow';
import history from '../history';

const App = () => {
	return (
		<div
			className="ui fluid container"
			style={{ height: '100vh', backgroundColor: '#F2EFF1' }}
		>
			{/* <div> */}
			<Router history={history}>
				<Header />
				{/* <div className="ui container"> */}
				<Switch>
					<Route path="/" exact component={StreamList} />
					<Route path="/streams/new" component={StreamCreate} />
					<Route path="/streams/edit/:id" component={StreamEdit} />
					<Route path="/streams/delete/:id" component={StreamDelete} />
					<Route path="/streams/:id" component={StreamShow} />
				</Switch>
				{/* </div> */}
			</Router>
			{/* </div> */}
		</div>
	);
};

export default App;
