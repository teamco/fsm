import { useEffect } from 'react';

import { PROCESSES } from '../constants/statuses';

/**
 * @ignore
 */
const stub = () => {};

/**
 * @classdesc The ProcessMachine class represents a process machine.
 * @export
 */
export class ProcessMachine {
    /**
     * @constructor
     * @description The constructor sets up the initial state of the machine, which appears to be a process machine based on the context.
     * @param {string} [initialState=PROCESSES.PENDING] - The initial state of the machine.
     * @param {string} [namespace='fsm'] - The namespace of the machine.
     */
    constructor(initialState = PROCESSES.PENDING, namespace = 'fsm') {
        this.namespace = namespace;
        this.state = initialState;
        this.cancelable = true;
        this.DEFAULT_STATE = initialState;
    }

    /**
     * @description Deactivate the  process machine, setting it to the default state.
     * @type {function}
     */
    deactivate() {
        this.state = this.DEFAULT_STATE;
        this.cancelable = true;
    }

    transitions = {
        
        [PROCESSES.PENDING]: {
            /**
             * @description Activate the  process machine, setting it to the PROCESSING state.
             * @memberof ProcessMachine
             * @type {function}
             */
            activate() {
                this.state = PROCESSES.PROCESSING;
                this.cancelable = true;
            }
        },

        [PROCESSES.PROCESSING]: {
            /**
             * @description Activate the  process machine, setting it to the SHIPPED state.
             * @memberof ProcessMachine
             * @type {function}
             */
            activate() {
                this.state = PROCESSES.SHIPPED;
                this.cancelable = false;
            }
        },

        [PROCESSES.SHIPPED]: {
            /**
             * @description Activate the  process machine, setting it to the DELIVERED state.
             * @memberof ProcessMachine
             * @type {function}
             */
            activate() {
                this.state = PROCESSES.DELIVERED;
                this.cancelable = false;
            }
        },

        [PROCESSES.DELIVERED]: {
            /**
             * @description Activate the  process machine, setting it to the DEFAULT_STATE.
             * @memberof ProcessMachine
             * @type {function}
             */
            activate() {
                this.state = this.DEFAULT_STATE;
                this.cancelable = true;
            }
        },

        [PROCESSES.CANCELING]: {
            /**
             * @description Activate the  process machine, setting it to the CANCELING.
             * @memberof ProcessMachine
             * @type {function}
             */
            activate() {
                this.state = this.DEFAULT_STATE;
                this.cancelable = true;
            }
        }
    };

    /**
     * @description Dispatch an action to the  process machine.
     * @function dispatch
     * @type {function}
     * @param {string} actionName - The name of the action to dispatch.
     * @memberof ProcessMachine
     * @instance
     */
    dispatch(actionName) {
        const action = this.transitions[this.state]?.[actionName];

        if (action) {
            action.call(this);
        } else {
            throw new Error(`Invalid action: ${actionName}`);
        }
    }
}

/**
 * Use the machine.
 * @export
 * @param {function} setter - The machine to use.
 * @param {string} state - The initial state of the machine.
 */
export const useMachine = (setter = stub, state = PROCESSES.PENDING) => {
    useEffect(() => {
        typeof setter === 'function' && setter && setter(new ProcessMachine(state, 'fsm'));
    }, [setter, state]);
};
