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
    const { testId, type, state, className, disabled } = props;

    return (
        <div
            className={classnames(styles.process, className, {
                [styles[state?.toLowerCase()]]: !!state,
                [styles[type?.toLowerCase()]]: !!type,
                [styles.disabled]: typeof disabled === 'undefined' ? state !== type : disabled
            })}            
            data-testid={testId}
        >
            <span>{type}</span>
        </div>
    );
};
