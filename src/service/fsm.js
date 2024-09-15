import { useEffect } from 'react';

import { LIGHTS } from '../constants/statuses';

const stub = () => {};

/**
 * Machine representing the traffic light.
 * @type {object}
 */
const machine = {
    state: LIGHTS.RED,
    deactivate() {
        this.state = LIGHTS.RED;
    },
    transitions: {
        [LIGHTS.RED]: {
            activate() {
                this.state = LIGHTS.YELLOW;
            }
        },
        [LIGHTS.GREEN]: {
            activate() {
                this.state = LIGHTS.BLINK;
            }
        },
        [LIGHTS.BLINK]: {
            activate() {
                this.state = LIGHTS.RED;
            }
        },
        [LIGHTS.YELLOW]: {
            activate() {
                this.state = LIGHTS.GREEN;
            }
        }
    },
    dispatch(actionName) {
        const action = this.transitions[this.state][actionName];

        if (action) {
            action.call(this);
        } else {
            console.log('Invalid action');
        }
    }
};

/**
 * Use the machine.
 * @export
 * @param {function} setMachine - The machine to use.
 */
export const useMachine = (setMachine = stub) => {
    useEffect(() => {
        setMachine(Object.create(machine));
    }, [setMachine]);
};
