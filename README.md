[![Playwright E2E](https://github.com/teamco/fsm/actions/workflows/playwright.yml/badge.svg)](https://github.com/teamco/fsm/actions/workflows/playwright.yml)
[![CSpell CI](https://github.com/teamco/fsm/actions/workflows/cspell.yml/badge.svg)](https://github.com/teamco/fsm/actions/workflows/cspell.yml)
[![CICD.Build](https://github.com/teamco/fsm/actions/workflows/build.yml/badge.svg)](https://github.com/teamco/fsm/actions/workflows/build.yml)
[![Unit tests CI](https://github.com/teamco/fsm/actions/workflows/unit.test.js.yml/badge.svg)](https://github.com/teamco/fsm/actions/workflows/unit.test.js.yml)

[Demo](https://teamco.github.io/fsm/)

<img width="781" alt="Screenshot 2024-09-20 at 17 39 37" src="https://github.com/user-attachments/assets/12a6b07e-9641-4684-ba58-b52fef640cc2">

<img width="781" alt="Screenshot 2024-09-20 at 23 55 27" src="https://github.com/user-attachments/assets/a3fb5b8c-8dac-48e7-9e58-0068fe61e634">


# ProcessMachine Simulator

=====================================

This project simulates a Shipping system using a finite state machine (FSM). The simulator allows you to display a sequence of shipping and logs the state of the shipping at each interval.

## Getting Started

-------------

To use the simulator, simply import the `useMachine` function and create a new instance of the machine. You can then start the simulation by calling the `start` function.

## Configuration

-------------

The simulator allows you to customize the sequence of shipping states displayed. You can pass an array of states to the `useMachine` function to specify the sequence.

## Logging

-------------

The simulator logs the state of the shipping at each interval. 

## Example Usage

-------------

Here's an example of how to use the simulator:

```javascript
import { useMachine } from './useMachine';

const machine = useMachine();
machine.start();

// To customize the sequence of process
const machine = useMachine([
    PROCESSES.PENDING, 
    PROCESSES.PROCESSING, 
    PROCESSES.SHIPPED, 
    PROCESSES.DELIVERED
]);
machine.start();
```
