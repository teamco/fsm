import React from 'react';
import { cleanup } from '@testing-library/react';

import { expectations, mocksWorkaround } from '../../../../__tests__/helper.js';

import { Light } from '../Light.jsx';
import { LIGHTS } from '../../../constants/statuses.js';

const testId = 'lightId';

describe('components/light/Light.jsx', () => {
    // Note: running cleanup afterEach is done automatically for you in @testing-library/react@9.0.0 or higher
    // unmount and cleanup DOM after the test is finished.
    afterEach(cleanup);

    mocksWorkaround();

    /**
     * Checks if a component has a disabled class.
     *
     * @param {React.ReactElement} component - The component to check.
     * @param {boolean} [isNull=false] - Whether or not the disabled class should be null.
     */
    function checkDisable(component, isNull = false) {
        const disabled = component.querySelector('span.disabled');
        isNull ? expect(disabled).toBeNull() : expect(disabled).not.toBeNull();
    }

    it('Default render light', async () => {
        const props = { testId };

        const { component } = await expectations(Light, testId, props, true);

        expect(component).toHaveClass('light');
    });

    it('Typed render GREEN light', async () => {
        const props = { testId, type: LIGHTS.GREEN };

        const { component } = await expectations(Light, testId, props, true);

        expect(component).toHaveClass(LIGHTS.GREEN.toLowerCase());

        checkDisable(component);
    });

    it('Typed render RED light', async () => {
        const props = { testId, type: LIGHTS.RED };

        const { component } = await expectations(Light, testId, props, true);

        expect(component).toHaveClass(LIGHTS.RED.toLowerCase());

        checkDisable(component);
    });

    it('Typed render YELLOW light', async () => {
        const props = { testId, type: LIGHTS.YELLOW };

        const { component } = await expectations(Light, testId, props, true);

        expect(component).toHaveClass(LIGHTS.YELLOW.toLowerCase());

        checkDisable(component);
    });

    it('Typed render BLINK light', async () => {
        const props = { testId, type: LIGHTS.BLINK };

        const { component } = await expectations(Light, testId, props, true);

        expect(component).toHaveClass(LIGHTS.BLINK.toLowerCase());

        checkDisable(component);
    });

    it('Typed render GREEN light with state', async () => {
        const props = { testId, type: LIGHTS.GREEN, state: LIGHTS.GREEN };

        const { component } = await expectations(Light, testId, props, true);

        checkDisable(component, true);
    });

    it('Typed render RED light with state', async () => {
        const props = { testId, type: LIGHTS.RED, state: LIGHTS.RED };

        const { component } = await expectations(Light, testId, props, true);

        checkDisable(component, true);
    });

    it('Typed render YELLOW light with state', async () => {
        const props = { testId, type: LIGHTS.YELLOW, state: LIGHTS.YELLOW };

        const { component } = await expectations(Light, testId, props, true);

        checkDisable(component, true);
    });

    it('Typed render BLINK light with state', async () => {
        const props = { testId, type: LIGHTS.RED, state: LIGHTS.BLINK };

        const { component } = await expectations(Light, testId, props, true);

        expect(component).toHaveClass(LIGHTS.BLINK.toLowerCase());

        checkDisable(component, true);
    });
});
