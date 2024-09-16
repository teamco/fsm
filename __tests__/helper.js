import React, { act } from 'react';
import 'mutationobserver-shim';

import { render, screen, waitFor, renderHook } from '@testing-library/react';
import { queryHelpers } from '@testing-library/dom';

import '@testing-library/jest-dom';

/**
 * The Jest documentation now has an "official" workaround.
 * @link https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
 * @export
 */
export const mocksWorkaround = () => {
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation((query) => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: jest.fn(), // Deprecated
            removeListener: jest.fn(), // Deprecated
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn()
        }))
    });
};

/**
 * Render a component and return an object with references to the react
 * component, the rendered dom, and the render function.
 *
 * @param {React.ComponentType} Component - The component to render.
 * @param {string} testId - The id to query for the rendered dom.
 * @param {Object} [props={}] - Props to pass to the component.
 * @param {boolean} [hooked=false] - Whether to render the component as a hook.
 * @param {React.ComponentType} [WrappedBy=null] - A component to wrap the component with.
 * @param {boolean} [snapshot=false] - Whether to snapshot the rendered dom.
 */
export const expectations = async (
    Component,
    testId,
    props = {},
    hooked = false,
    WrappedBy = null,
    snapshot = false
) => {
    const _render = await act(async () => {
        return WrappedBy
            ? render(
                  <WrappedBy>
                      <Component {...props} />
                  </WrappedBy>
              )
            : render(<Component {...props} />);
    });

    const _cmpReact = hooked ? renderHook(() => Component(props)) : Component(props);

    const _cmpDom = await waitFor(() => screen?.queryByTestId(testId));

    snapshot && expect(_render.asFragment()).toMatchSnapshot();
    expect(_cmpReact).toBeDefined();
    expect(_cmpDom).toBeInTheDocument();

    return { component: _cmpDom, render: _render };
};

export const queryByTestId = queryHelpers.queryByAttribute.bind(null, 'data-testid');

export const queryAllByTestId = queryHelpers.queryAllByAttribute.bind(null, 'data-testid');

/**
 * Finds all elements with the given `data-testid` attribute.
 *
 * @param container - The container to search within.
 * @param id - The value of the `data-testid` attribute.
 * @param rest - Additional arguments to pass to `queryAllByAttribute`.
 * @returns {HTMLElement[]} An array of elements with the given `data-testid`.
 * @throws {Error} If no elements are found.
 */
export function getAllByTestId(container, id, ...rest) {
    const els = queryAllByTestId(container, id, ...rest);
    if (!els.length) {
        throw queryHelpers.getElementError(`Unable to find an element by: [data-testid="${id}"]`, container);
    }
    return els;
}

/**
 * Finds an element with the given `data-testid` attribute.
 *
 * @param {Element} container - The element to search within.
 * @param {string} id - The value of the `data-testid` attribute.
 * @param {...any} rest - Additional arguments to pass to the
 * {@link queryHelpers#queryAllByAttribute} function.
 * @returns {Element} The element with the given `data-testid`.
 * @throws {Error} If no element is found, or if more than one element is found.
 */
export function getByTestId(container, id, ...rest) {
    // result >= 1
    const result = getAllByTestId(container, id, ...rest);
    if (result.length > 1) {
        throw queryHelpers.getElementError(`Found multiple elements with the [data-testid="${id}"]`, container);
    }
    return result[0];
}
