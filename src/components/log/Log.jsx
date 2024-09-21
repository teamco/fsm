import React from 'react';
import classnames from 'classnames';

import { PROCESSES } from '../../constants/statuses';

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
    const { className, testId, logs = [] } = props;

    return (
        <div className={styles.wrapper}>
            <div className={styles.counter}>Counter: {logs.length}</div>
            <div className={classnames(styles.log, className)} data-testid={testId}>
                {logs?.length
                    ? logs?.map((log, index) => (
                          <span className={classnames({ [styles.divider]: log === PROCESSES.DELIVERED })} key={index}>
                              {log}
                          </span>
                      ))
                    : 'Log: No Data'}
            </div>
        </div>
    );
};
