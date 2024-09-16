import React from 'react';
import { cleanup } from '@testing-library/react';

import { expectations, mocksWorkaround } from '../../../../__tests__/helper.js';

import { Log } from '../Log.jsx';
import { LIGHTS } from '../../../constants/statuses.js';

const testId = 'logId';
const className = 'logId-className';

describe('components/log/Log.jsx', () => {

  // Note: running cleanup afterEach is done automatically for you in @testing-library/react@9.0.0 or higher
  // unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  mocksWorkaround();

  it('Default render log', async () => {
    const props = { testId };

    const { component } = await expectations(Log, testId, props, true);

    expect(component).toHaveClass('log');
    expect(component).toHaveTextContent('No Data');
  });

  
  it('Render log with custom class name', async () => {
    const props = { testId, className };

    const { component } = await expectations(Log, testId, props, true);

    expect(component).toHaveClass(className);
  });

  it('Render log with data', async () => {
    const props = { testId, logs: ['1', '2', '3'] };

    const { component } = await expectations(Log, testId, props, true);

    expect(component).toHaveTextContent('1');
    expect(component).toHaveTextContent('2');
    expect(component).toHaveTextContent('3');
  });

  it('Render log with divider', async () => {
    const props = { testId, logs: ['1', '2', LIGHTS.RED] };

    const { component } = await expectations(Log, testId, props, true);

    expect(component).toHaveTextContent('1');
    expect(component).toHaveTextContent('2');
    expect(component).toHaveTextContent(LIGHTS.RED);

    const divider = component.querySelector('span.divider');
    expect(divider).not.toBeNull();
    expect(divider).toHaveTextContent(LIGHTS.RED);
  });

  
});
