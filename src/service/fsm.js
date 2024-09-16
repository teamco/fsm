import { useEffect } from 'react';

import { LIGHTS } from '../constants/statuses';

/**
 * @ignore
 */
const stub = () => {};

/**
 * @classdesc The TrafficLightMachine class represents a traffic light machine.
 * @export
 */
export class TrafficLightMachine {

    /**
     * @constructor
     * @description The constructor sets up the initial state of the machine, which appears to be a traffic light machine based on the context.
     * @param {string} [initialState=LIGHTS.RED] - The initial state of the machine.
     * @param {string} [namespace='fsm'] - The namespace of the machine.
     */
    constructor(initialState = LIGHTS.RED, namespace = 'fsm') {
        this.namespace = namespace;
        this.state = initialState;    
        this.DEFAULT_STATE = initialState;    
    }    

    /**
     * @description Deactivate the traffic light machine, setting it to the default state.
     * @type {function}
     */
    deactivate() {
        this.state = this.DEFAULT_STATE;
    }

    transitions = {

        [LIGHTS.RED]: {

            /**
             * @description Activate the traffic light machine, setting it to the yellow state.
             * @memberof TrafficLightMachine
             * @type {function}
             */
            activate() {
                this.state = LIGHTS.YELLOW;
            }
        },

        [LIGHTS.GREEN]: {
            
            /**
             * @description Activate the traffic light machine, setting it to the blinking state.
             * @memberof TrafficLightMachine
             * @type {function}
             */
            activate() {
                this.state = LIGHTS.BLINK;
            }
        },

        [LIGHTS.BLINK]: {
            
            /**
             * @description Activate the traffic light machine, setting it to the red state.
             * @memberof TrafficLightMachine
             * @type {function}
             */
            activate() {
                this.state = LIGHTS.RED;
            }
        },

        [LIGHTS.YELLOW]: {
            
            /**
             * @description Activate the traffic light machine, setting it to the green state.
             * @memberof TrafficLightMachine
             * @type {function}
             */
            activate() {
                this.state = LIGHTS.GREEN;
            }
        }
    }

    /**
     * @description Dispatch an action to the traffic light machine.
     * @function dispatch
     * @type {function}
     * @param {string} actionName - The name of the action to dispatch.
     * @memberof TrafficLightMachine
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
};

/**
 * Use the machine.
 * @export
 * @param {function} setter - The machine to use.
 * @param {string} state - The initial state of the machine.
 */
export const useMachine = (setter = stub, state = LIGHTS.RED) => {
    useEffect(() => {
        typeof setter === 'function' && setter && setter(new TrafficLightMachine(state, 'fsm'));
    }, [setter, state]);
};
