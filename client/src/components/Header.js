import React from 'react';
import { Link } from 'react-router-dom';
import GoogleAuth from './GoogleAuth';

const Header = () => {
	return (
		<div
			className="ui fixed top menu"
			style={{ paddingTop: '2px', backgroundColor: '#F3E8EE' }}
		>
			<Link to="/" className="item" style={{ fontFamily: 'Hanalei' }}>
				Streamer
			</Link>
			<div className="right menu">
				<Link to="/" className="item">
					All Streams
				</Link>
				<GoogleAuth />
			</div>
		</div>
	);
};

export default Header;
