import { cleanup } from '@testing-library/react';

import { expectations, mocksWorkaround } from '../../../../__tests__/helper.js';

import { Process } from '../Process.jsx';

const testId = 'processId';
const className = 'processId-className';

describe('components/process/Process.jsx', () => {

  // Note: running cleanup afterEach is done automatically for you in @testing-library/react@9.0.0 or higher
  // unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  mocksWorkaround();

  it('Default render Process', async () => {
    const props = { testId };

    const { component } = await expectations(Process, testId, props, true);

    expect(component).toHaveClass('process');
  });

  
  it('Render Process with custom class name', async () => {
    const props = { testId, className };

    const { component } = await expectations(Process, testId, props, true);

    expect(component).toHaveClass(className);
  });

  it('Render Process with disabled data', async () => {
    const props = { testId, type: 'demo' };

    const { component } = await expectations(Process, testId, props, true);

    expect(component).toHaveTextContent(props.type);
    expect(component).toHaveClass('disabled');
  });

  it('Render Process with enabled data', async () => {
    const props = { testId, type: testId, state: testId };

    const { component } = await expectations(Process, testId, props, true);

    expect(component).toHaveTextContent(props.type);
    expect(component).not.toHaveClass('disabled');
  });

  
});
