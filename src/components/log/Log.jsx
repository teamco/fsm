import React from 'react';

import styles from './log.module.css';

/**
 * Component representing a log of events.
 *
 * @param {{[testId]: string, logs?: string[]}} props
 * @prop {string} [testId] - The value for the `data-testid` attribute.
 * @prop {string[]} [logs=[]] - The logs to display.
 *
 * @returns {React.ReactElement} The log component.
 */
export const Log = (props) => {
    const { testId, logs = [] } = props;

    return (
        <div className={styles.log} data-testid={testId}>
            {logs?.length ? logs?.map((log, index) => <span key={index}>{log}</span>) : 'No Data'}
        </div>
    );
};
