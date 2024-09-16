import React from 'react';
import classnames from 'classnames';

import { LIGHTS } from '../../constants/statuses';

import styles from './light.module.css';

/**
 * Component representing a traffic light.
 *
 * @param {{[testId]: string, className: string}} props
 * @prop {string} [testId] - The value for the `data-testid` attribute.
 * @prop {string} type - The type to apply to the outermost element.
 *
 * @returns {React.ReactElement} The traffic light component.
 */
export const Light = (props) => {
    const { testId, type, state } = props;

    const disabled = state !== type;

    return (
        <div
            className={classnames(styles.light, {
                [styles[state?.toLowerCase()]]: state,
                [styles[type?.toLowerCase()]]: type,
            })}
            data-testid={testId}
        >
            <span className={classnames({ [styles.disabled]: disabled && state !== LIGHTS.BLINK })} />
        </div>
    );
};
