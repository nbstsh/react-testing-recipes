import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import Toggle from './toggle.component';

let container = null;

beforeEach(() => {
	container = document.createElement('div');
	document.body.append(container);
});

afterEach(() => {
	unmountComponentAtNode(container);
	container.remove();
	container = null;
});

it('should change value whem clicked', () => {
	const onChange = jest.fn();
	act(() => {
		render(<Toggle onChange={onChange} />, container);
	});

	const button = document.querySelector('[data-testid="toggle"]');
	expect(button.innerHTML).toBe('Turn on');

	act(() => {
		button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
	});

	expect(onChange).toHaveBeenCalledTimes(1);
	expect(button.innerHTML).toBe('Turn off');

	act(() => {
		for (let i = 0; i < 5; i++) {
			button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
		}
	});

	expect(onChange).toHaveBeenCalledTimes(6);
	expect(button.innerHTML).toBe('Turn on');
});
