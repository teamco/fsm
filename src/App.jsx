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
 * @returns {React.ReactElement} The traffic process component.
 */
const App = (props) => {
    const { processes = [PROCESSES.PENDING, PROCESSES.PROCESSING, PROCESSES.SHIPPED, PROCESSES.DELIVERED], testId } =
        props;

    const [machine, setMachine] = useState(null);
    const [intervalId, setIntervalId] = useState(null);
    const [logs, setLogs] = useState([]);

    const start = () => {
        if (!machine) return console.error('Unable to start FSM');

        const ts = window.setInterval(() => {
            machine.dispatch('activate');
            setLogs((prevState) => [...prevState, machine?.state]);
        }, TIMEOUT);

        setIntervalId(ts);
    };

    const stop = () => {
        window.clearInterval(intervalId);
        setIntervalId(null);
        setLogs([]);
        machine.deactivate();
    };

    useMachine(setMachine);

    return (
        <div className={styles.app} data-testid={testId}>
            <div>
                <div className={styles.processes}>
                    <Process
                        style={{ height: 20, top: 30, right: 20 }}
                        key={PROCESSES.CANCELLED}
                        state={machine?.state}
                        type={PROCESSES.CANCELLED}
                    />
                    <Arrows />
                    <div>
                        {processes.map((process) => (
                            <Process key={process} state={machine?.state} type={process} />
                        ))}
                    </div>
                </div>
                <Log logs={logs} />
                <div>
                    <div className={styles.counter}>Counter: {logs.length}</div>
                    <button onClick={intervalId ? stop : start}>{intervalId ? 'Clear' : 'Start'}</button>
                </div>
            </div>
        </div>
    );
};

export default App;
