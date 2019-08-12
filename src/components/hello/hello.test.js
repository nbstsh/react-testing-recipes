import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import Hello from './hello.component';

let container = null;

beforeEach(() => {
	// setup Dom element as a render target
	container = document.createElement('div');
	document.body.appendChild(container);
});

afterEach(() => {
	// clean up on exiting
	unmountComponentAtNode(container);
	container.remove();
	container = null;
});

it('renders with or without or without a name', () => {
	act(() => {
		render(<Hello />, container);
	});
	expect(container.textContent).toBe('Hey, stranger');

	act(() => {
		render(<Hello name="Jenny" />, container);
	});
	expect(container.textContent).toBe('Hello, Jenny!');

	act(() => {
		render(<Hello name="Mike" />, container);
	});
	expect(container.textContent).toBe('Hello, Mike!');
});
