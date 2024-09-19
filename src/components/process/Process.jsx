import React from 'react';
import classnames from 'classnames';

// import { PROCESSES } from '../../constants/statuses';

import styles from './process.module.css';

/**
 * Component representing a process.
 *
 * @param {{[testId]: string, className: string}} props
 * @prop {string} [testId] - The value for the `data-testid` attribute.
 * @prop {string} [style] - The value for the css style attributes.
 * @prop {string} type - The type to apply to the outermost element.
 *
 * @returns {React.ReactElement} The process component.
 */
export const Process = (props) => {
    const { testId, type, state, style } = props;

    const disabled = state !== type;

    return (
        <div
            className={classnames(styles.process, {
                [styles[state?.toLowerCase()]]: state,
                [styles[type?.toLowerCase()]]: type,
            })}
            style={style}
            data-testid={testId}
        >
            <span className={classnames({ [styles.disabled]: disabled })}>{type}</span>
        </div>
    );
};
