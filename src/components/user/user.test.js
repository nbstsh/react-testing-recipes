import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import User from './user.component';

let container = null;

beforeEach(() => {
	container = document.createElement('div');
	render(<User />, container);
});

afterEach(() => {
	unmountComponentAtNode(container);
	container.remove();
	container = null;
});

it('renders user data', async () => {
	const fakeUser = {
		name: 'Mike Johnson',
		age: '77',
		address: '123, fourth road'
	};

	jest.spyOn(global, 'fetch').mockImplementation(() =>
		Promise.resolve({
			json: () => Promise.resolve(fakeUser)
		})
	);

	await act(async () => {
		render(<User />, container);
	});

	expect(container.querySelector('summary').textContent).toBe(fakeUser.name);
	expect(container.querySelector('strong').textContent).toBe(fakeUser.age);
	expect(container.textContent).toContain(fakeUser.address);

	// remove the mock to ensure tests are completely isolated
	global.fetch.mockRestore();
});
