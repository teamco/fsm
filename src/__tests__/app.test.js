import React from 'react';
import { cleanup } from '@testing-library/react';

import { expectations, mocksWorkaround } from '../../__tests__/helper.js';

import App from '../App.jsx';

const testId = 'appId';
const className = 'appId-className';

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
        expect(component).toHaveTextContent('Counter: 0');

        const lights = component.querySelector('.lights');
        expect(lights).not.toBeNull();
    });


});
