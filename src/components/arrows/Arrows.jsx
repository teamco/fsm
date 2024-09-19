import React from 'react';

import styles from './arrows.module.css';

/**
 * Component representing a Arrows.
 *
 * @param {{[testId]: string}} props
 * @prop {string} [testId] - The value for the `data-testid` attribute.
 *
 * @returns {React.ReactElement} The Arrows component.
 */
export const Arrows = (props) => {
    const { testId } = props;

    return (
        <div data-testid={testId} className={styles.arrows}>
            <div>
                <div />
            </div>
            <div className={styles.delay1}>
                <div />
            </div>
            <div className={styles.delay2}>
                <div />
            </div>
            <div className={styles.delay3}>
                <div />
            </div>
        </div>
    );
};
