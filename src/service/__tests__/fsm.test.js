import { LIGHTS } from '../../constants/statuses';

import { TrafficLightMachine } from '../fsm';

describe('TrafficLightMachine Suite', () => {
    it('Should initialize with default state RED when no initial state is provided', () => {
        const machine = new TrafficLightMachine();
        expect(machine.state).toBe(LIGHTS.RED);
    });

    it('Should initialize with custom initial state when provided', () => {
        const customInitialState = LIGHTS.GREEN;
        const machine = new TrafficLightMachine(customInitialState);
        expect(machine.state).toBe(customInitialState);
    });

    it('Should reset to default state when deactivated', () => {
        const machine = new TrafficLightMachine();
        machine.state = LIGHTS.GREEN;
        machine.deactivate();
        expect(machine.state).toBe(LIGHTS.RED);
    });

    it('Should transition from RED to YELLOW when "activate" action is dispatched', () => {
        const machine = new TrafficLightMachine();
        machine.dispatch('activate');
        expect(machine.state).toBe(LIGHTS.YELLOW);
    });

    it('Should transition from YELLOW to GREEN when "activate" action is dispatched', () => {
        const machine = new TrafficLightMachine(LIGHTS.YELLOW);
        machine.dispatch('activate');
        expect(machine.state).toBe(LIGHTS.GREEN);
    });

    it('Should transition from GREEN to BLINK when activating', () => {
        const machine = new TrafficLightMachine(LIGHTS.GREEN);
        machine.dispatch('activate');
        expect(machine.state).toBe(LIGHTS.BLINK);
    });

    it('Should transition from BLINK to RED when activating', () => {
        const machine = new TrafficLightMachine(LIGHTS.BLINK);
        machine.dispatch('activate');
        expect(machine.state).toBe(LIGHTS.RED);
    });

    it('Should deactivate TrafficLightMachine when already in default state', () => {
        const machine = new TrafficLightMachine();
        machine.deactivate();
        expect(machine.state).toBe(LIGHTS.RED);
    });

    it('Should deactivate TrafficLightMachine when already in custom default state', () => {
        const machine = new TrafficLightMachine(LIGHTS.GREEN);
        machine.deactivate();
        expect(machine.state).toBe(LIGHTS.GREEN);
    });

    it('Should assign default namespace "fsm" when no namespace is provided', () => {
        const machine = new TrafficLightMachine();
        expect(machine.namespace).toBe('fsm');
    });

    it('Should assign custom namespace when no namespace is provided', () => {
        const machine = new TrafficLightMachine(LIGHTS.RED, 'customNamespace');
        expect(machine.namespace).toBe('customNamespace');
    });

    it('Should persist state changes across multiple dispatches', () => {
        const machine = new TrafficLightMachine();
        expect(machine.state).toBe(LIGHTS.RED);

        machine.dispatch('activate');
        expect(machine.state).toBe(LIGHTS.YELLOW);

        machine.dispatch('activate');
        expect(machine.state).toBe(LIGHTS.GREEN);

        machine.dispatch('activate');
        expect(machine.state).toBe(LIGHTS.BLINK);

        machine.dispatch('activate');
        expect(machine.state).toBe(LIGHTS.RED);
    });

    it('Should transition states correctly when actions are dispatched', () => {
        const machine1 = new TrafficLightMachine();
        const machine2 = new TrafficLightMachine(LIGHTS.GREEN);

        machine1.dispatch('activate');
        expect(machine1.state).toBe(LIGHTS.YELLOW);

        machine2.dispatch('activate');
        expect(machine2.state).toBe(LIGHTS.BLINK);

        machine1.dispatch('activate');
        expect(machine1.state).toBe(LIGHTS.GREEN);

        machine2.dispatch('activate');
        expect(machine2.state).toBe(LIGHTS.RED);
    });

    it('Should isolate state changes between instances when multiple instances are created', () => {
        const machine1 = new TrafficLightMachine();
        const machine2 = new TrafficLightMachine();

        machine1.dispatch('activate');
        expect(machine1.state).toBe(LIGHTS.YELLOW);
        expect(machine2.state).toBe(LIGHTS.RED);

        machine2.dispatch('activate');
        expect(machine1.state).toBe(LIGHTS.YELLOW);
        expect(machine2.state).toBe(LIGHTS.YELLOW);
    });

    it('Should throw an error when dispatching an invalid action', () => {
        const machine = new TrafficLightMachine();
        expect(() => machine.dispatch('invalidAction')).toThrow('Invalid action: invalidAction');
    });
});