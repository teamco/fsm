import { useEffect } from 'react';

import { PROCESSES } from '../constants/statuses';

import { fbFindById } from './firebase.service';

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
     * @param {function} [loading='fsm'] - The loading state of the machine.
     */
    constructor(initialState = PROCESSES.PENDING, namespace = 'fsm', loading = stub) {
        this.namespace = namespace;
        this.state = initialState;
        this.cancelable = true;
        this.DEFAULT_STATE = initialState;
        this.loading = loading;
    }

    get(docName = '') {
        const _that = this;
        _that.loading(true);

        fbFindById({ collectionPath: 'fsm', docName: docName.toLowerCase() }).then((res) => {
            const { state, cancelable } = res.data();
            _that.state = state.toUpperCase();
            _that.cancelable = cancelable;
            _that.loading(false);
        });
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
                this.get(PROCESSES.PENDING);
            }
        },

        [PROCESSES.PROCESSING]: {
            /**
             * @description Activate the  process machine, setting it to the SHIPPED state.
             * @memberof ProcessMachine
             * @type {function}
             */
            activate() {
                this.get(PROCESSES.PROCESSING);
            }
        },

        [PROCESSES.SHIPPED]: {
            /**
             * @description Activate the  process machine, setting it to the DELIVERED state.
             * @memberof ProcessMachine
             * @type {function}
             */
            activate() {
                this.get(PROCESSES.SHIPPED);
            }
        },

        [PROCESSES.DELIVERED]: {
            /**
             * @description Activate the  process machine, setting it to the DEFAULT_STATE.
             * @memberof ProcessMachine
             * @type {function}
             */
            activate() {
                this.get(PROCESSES.DELIVERED);
            }
        },

        [PROCESSES.CANCELING]: {
            /**
             * @description Activate the  process machine, setting it to the CANCELING.
             * @memberof ProcessMachine
             * @type {function}
             */
            activate() {
                this.get(PROCESSES.CANCELING);
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
 * @param {function} loading - The loading to use.
 * @param {string} state - The initial state of the machine.
 */
export const useMachine = (setter = stub, loading = stub, state = PROCESSES.PENDING) => {
    useEffect(() => {
        typeof setter === 'function' && setter && setter(new ProcessMachine(state, 'fsm', loading));
    }, [setter, loading, state]);
};
