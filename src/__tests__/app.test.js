import { cleanup, fireEvent } from '@testing-library/react';

import { expectations, mocksWorkaround, delay } from '../../__tests__/helper.js';

import { LIGHTS, TIMEOUT } from '../constants/statuses.js';

import App from '../App.jsx';

const testId = 'appId';

describe('App.jsx', () => {
    // Note: running cleanup afterEach is done automatically for you in @testing-library/react@9.0.0 or higher
    // unmount and cleanup DOM after the test is finished.
    afterEach(cleanup);

    mocksWorkaround();

    it('Default render App', async () => {
        const props = { testId };

        const { component } = await expectations(App, testId, props, true);

        expect(component).toHaveClass('app');
        expect(component).toHaveTextContent('No Data');
        expect(component).toHaveTextContent('Start');
        expect(component).toHaveTextContent('Counter: 0');

        const lights = component.querySelector('.lights');
        expect(lights).not.toBeNull();
    });

    it('Should toggle button text', async () => {
        const props = { testId };

        console.error = jest.fn();

        const { component } = await expectations(App, testId, props, true);

        const startBtn = component.querySelector('button');
        expect(startBtn).not.toBeNull();
        expect(startBtn).toHaveTextContent('Start');
        expect(startBtn).not.toHaveTextContent('Clear');

        fireEvent.click(startBtn);

        expect(startBtn).toHaveTextContent('Clear');
        expect(startBtn).not.toHaveTextContent('Start');
    });

    it('Should start/stop machine', async () => {
        const props = { testId };

        console.error = jest.fn();

        const { component } = await expectations(App, testId, props, true);

        const startBtn = component.querySelector('button');
        const counter = component.querySelector('.counter');

        expect(counter).toHaveTextContent('Counter: 0');

        // Start
        fireEvent.click(startBtn);

        await delay(TIMEOUT + 100);

        expect(counter).toHaveTextContent('Counter: 1');
        expect(component).toHaveTextContent(LIGHTS.YELLOW);

        // Clear
        fireEvent.click(startBtn);

        expect(counter).toHaveTextContent('Counter: 0');
        expect(component).toHaveTextContent('No Data');
        expect(component).toHaveTextContent('Start');

    });
});
