import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import Contact from './contact.component';
import MockedMap from '../map/map.component';

jest.mock('../map/map.component.jsx');
MockedMap.mockImplementation(props => {
	return (
		<div data-testid="map">
			{props.center.lat}:{props.center.long}
		</div>
	);
});

let container = null;

beforeEach(() => {
	container = document.createElement('div');
	document.body.appendChild(container);
});

afterEach(() => {
	unmountComponentAtNode(container);
	container.remove();
	container = null;
});

it('should render contact informatio', () => {
	const center = { lat: 0, long: 0 };

	act(() => {
		render(
			<Contact
				name="dummy name"
				email="dummy@example.com"
				site="https://dummy.com"
				center={center}
			/>,
			container
		);
	});

	expect(
		container.querySelector('[data-testid="email"]').getAttribute('href')
	).toEqual('mailto:dummy@example.com');

	expect(
		container.querySelector('[data-testid="site"]').getAttribute('href')
	).toEqual('https://dummy.com');

	expect(container.querySelector('[data-testid="map"]').textContent).toEqual(
		'0:0'
	);
});
