import { PROCESSES } from '../../constants/statuses';

import { ProcessMachine } from '../fsm.process';

describe('ProcessMachine Suite', () => {
    it('Should initialize with default state PENDING when no initial state is provided', () => {
        const machine = new ProcessMachine();
        expect(machine.state).toBe(PROCESSES.PENDING);
    });

    it('Should initialize with custom initial state when provided', () => {
        const customInitialState = PROCESSES.PROCESSING;
        const machine = new ProcessMachine(customInitialState);
        expect(machine.state).toBe(customInitialState);
    });

    it('Should reset to default state when deactivated', () => {
        const machine = new ProcessMachine();
        machine.state = PROCESSES.SHIPPED;
        machine.deactivate();
        expect(machine.state).toBe(PROCESSES.PENDING);
    });

    it('Should transition from PENDING to PROCESSING when "activate" action is dispatched', () => {
        const machine = new ProcessMachine();
        machine.dispatch('activate');
        expect(machine.state).toBe(PROCESSES.PROCESSING);
    });

    it('Should transition from PROCESSING to SHIPPED when "activate" action is dispatched', () => {
        const machine = new ProcessMachine(PROCESSES.PROCESSING);
        machine.dispatch('activate');
        expect(machine.state).toBe(PROCESSES.SHIPPED);
    });

    it('Should transition from SHIPPED to DELIVERED when activating', () => {
        const machine = new ProcessMachine(PROCESSES.SHIPPED);
        machine.dispatch('activate');
        expect(machine.state).toBe(PROCESSES.DELIVERED);
    });

    it('Should transition from DELIVERED to DEFAULT when activating', () => {
        const machine = new ProcessMachine(PROCESSES.DELIVERED);
        machine.dispatch('activate');
        expect(machine.state).toBe(PROCESSES.DELIVERED);
    });

    it('Should deactivate ProcessMachine when already in default state', () => {
        const machine = new ProcessMachine();
        machine.deactivate();
        expect(machine.state).toBe(PROCESSES.PENDING);
    });

    it('Should deactivate ProcessMachine when already in custom default state', () => {
        const machine = new ProcessMachine(PROCESSES.PROCESSING);
        machine.deactivate();
        expect(machine.state).toBe(PROCESSES.PROCESSING);
    });

    it('Should assign default namespace "fsm" when no namespace is provided', () => {
        const machine = new ProcessMachine();
        expect(machine.namespace).toBe('fsm');
    });

    it('Should assign custom namespace when no namespace is provided', () => {
        const machine = new ProcessMachine(PROCESSES.PENDING, 'customNamespace');
        expect(machine.namespace).toBe('customNamespace');
    });

    it('Should persist state changes across multiple dispatches', () => {
        const machine = new ProcessMachine();
        expect(machine.state).toBe(PROCESSES.PENDING);

        machine.dispatch('activate');
        expect(machine.state).toBe(PROCESSES.PROCESSING);

        machine.dispatch('activate');
        expect(machine.state).toBe(PROCESSES.SHIPPED);

        machine.dispatch('activate');
        expect(machine.state).toBe(PROCESSES.DELIVERED);

        machine.dispatch('activate');
        expect(machine.state).toBe(PROCESSES.PENDING);
    });

    it('Should transition states correctly when actions are dispatched', () => {
        const machine1 = new ProcessMachine();
        const machine2 = new ProcessMachine(PROCESSES.PROCESSING);

        machine1.dispatch('activate');
        expect(machine1.state).toBe(PROCESSES.PROCESSING);

        machine2.dispatch('activate');
        expect(machine2.state).toBe(PROCESSES.SHIPPED);

        machine1.dispatch('activate');
        expect(machine1.state).toBe(PROCESSES.SHIPPED);

        machine2.dispatch('activate');
        expect(machine2.state).toBe(PROCESSES.DELIVERED);
    });

    it('Should isolate state changes between instances when multiple instances are created', () => {
        const machine1 = new ProcessMachine();
        const machine2 = new ProcessMachine();

        machine1.dispatch('activate');
        expect(machine1.state).toBe(PROCESSES.PROCESSING);
        expect(machine2.state).toBe(PROCESSES.PENDING);

        machine2.dispatch('activate');
        expect(machine1.state).toBe(PROCESSES.PROCESSING);
        expect(machine2.state).toBe(PROCESSES.PROCESSING);
    });

    it('Should throw an error when dispatching an invalid action', () => {
        const machine = new ProcessMachine();
        expect(() => machine.dispatch('invalidAction')).toThrow('Invalid action: invalidAction');
    });
});
