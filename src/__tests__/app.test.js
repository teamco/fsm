import { cleanup, fireEvent } from '@testing-library/react';

import { expectations, mocksWorkaround, delay } from '../../__tests__/helper.js';

import { PROCESSES, TIMEOUT } from '../constants/statuses.js';

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
        expect(component).toHaveTextContent('Auto');
        expect(component).toHaveTextContent('Next');
        expect(component).toHaveTextContent('Cancel');
        expect(component).toHaveTextContent('Reset');
        expect(component).toHaveTextContent('Counter: 1');
    });

    it('Should toggle button text', async () => {
        const props = { testId };

        console.error = jest.fn();

        const { component } = await expectations(App, testId, props, true);

        const startBtn = component.querySelectorAll('button')[0];
        expect(startBtn).not.toBeNull();
        expect(startBtn).toHaveTextContent('Auto');
        expect(startBtn).not.toHaveTextContent('Stop');

        fireEvent.click(startBtn);

        expect(startBtn).toHaveTextContent('Stop');
        expect(startBtn).not.toHaveTextContent('Auto');
    });

    it('Should auto start/stop machine', async () => {
        const props = { testId };

        console.error = jest.fn();

        const { component } = await expectations(App, testId, props, true);

        const startBtn = component.querySelectorAll('button')[0];
        const counter = component.querySelector('.counter');

        expect(counter).toHaveTextContent('Counter: 1');

        // Start
        startBtn.click();

        await delay(TIMEOUT + 1000);

        expect(counter).toHaveTextContent('Counter: 2');
        expect(component).toHaveTextContent(PROCESSES.PROCESSING);

        // Clear
        fireEvent.click(startBtn);

        expect(counter).toHaveTextContent('Counter: 0');
        expect(component).toHaveTextContent('Log: No Data');
        expect(component).toHaveTextContent('Auto');
    });

    it('Should handle cancel/reset', async () => {
        const props = { testId };

        console.error = jest.fn();

        const { component } = await expectations(App, testId, props, true);

        const nextBtn = component.querySelectorAll('button')[1];
        expect(nextBtn).toHaveTextContent('Next');

        const cancelBtn = component.querySelectorAll('button')[2];
        expect(cancelBtn).toHaveTextContent('Cancel');

        const resetBtn = component.querySelectorAll('button')[3];
        expect(resetBtn).toHaveTextContent('Reset');

        expect(cancelBtn).not.toBeDisabled();

        // Processing
        nextBtn.click();

        // Shipping
        nextBtn.click();

        // Delivered
        nextBtn.click();

        resetBtn.click();
        expect(cancelBtn).not.toBeDisabled();

        // Processing
        nextBtn.click();
        expect(cancelBtn).not.toBeDisabled();

        cancelBtn.click();
        expect(cancelBtn).not.toBeDisabled();
    });
});
