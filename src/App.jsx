import React, { useState } from 'react';

import Process from './components/process';
import Log from './components/log';
import Arrows from './components/arrows';

import { PROCESSES, TIMEOUT } from './constants/statuses';

import { useMachine } from './service/fsm.process';

import styles from './app.module.css';

/**
 * The main component of the process.
 *
 * @param {{[testId]: string, [processes]?: string[]}} props
 * @prop {string} [testId] - The value for the `data-testid` attribute.
 * @prop {string[]} [processes=[PROCESSES.PENDING, PROCESSES.PROCESSING, PROCESSES.SHIPPED, PROCESSES.DELIVERED]] - The lights
 * to display.
 *
 * @returns {React.ReactElement} The process component.
 */
const App = (props) => {
    const { processes = [PROCESSES.PENDING, PROCESSES.PROCESSING, PROCESSES.SHIPPED, PROCESSES.DELIVERED], testId } =
        props;

    const [machine, setMachine] = useState(null);
    const [intervalId, setIntervalId] = useState(null);
    const [logs, setLogs] = useState([processes[0]]);

    /**
     * @description Starts the finite state machine by setting an interval to dispatch the `activate` action.
     * @function
     * @returns {void}
     */
    const start = () => {
        if (!machine) return console.error('Unable to start FSM');

        const ts = window.setInterval(next, TIMEOUT);

        setIntervalId(ts);
    };

    const next = () => {
        machine.dispatch('activate');
        setLogs((prevState) => [...prevState, machine?.state]);
    };

    /**
     * @description Stops the finite state machine by clearing the interval, resetting the logs, and deactivating the machine.
     * @function
     * @returns {void}
     */
    const stop = () => {
        window.clearInterval(intervalId);
        setIntervalId(null);
        setLogs([]);
        machine.deactivate();
    };

    useMachine(setMachine, processes[0]);

    return (
        <div className={styles.app} data-testid={testId}>
            <div>
                <div className={styles.processes}>
                    <Process
                        className={styles.cancel}
                        key={PROCESSES.CANCELING}
                        state={machine?.state}
                        disabled={!machine?.cancelable}
                        type={PROCESSES.CANCELING}
                    />
                    <Arrows />
                    <div>
                        {processes.map((process) => (
                            <Process key={process} state={machine?.state} type={process} />
                        ))}
                    </div>
                </div>
                <Log logs={logs} />
            </div>
            <div className={styles.actions}>
                <hr />
                <div className={styles.info}>
                    <button onClick={intervalId ? stop : start}>{intervalId ? 'Stop' : 'Auto'}</button>
                    <button onClick={next}>Next</button>
                    <button onClick={stop} disabled={!machine?.cancelable}>
                        Cancel
                    </button>
                    <button onClick={stop}>Reset</button>
                </div>
            </div>
        </div>
    );
};

export default App;
