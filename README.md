

# Traffic Light Simulator
=====================================

This project simulates a traffic light system using a finite state machine (FSM). The simulator allows you to display a sequence of lights and logs the state of the traffic light at each interval.

## Getting Started
---------------

To use the simulator, simply import the `useMachine` function and create a new instance of the machine. You can then start the simulation by calling the `start` function.

## Configuration
-------------

The simulator allows you to customize the sequence of lights displayed. You can pass an array of light colors to the `useMachine` function to specify the sequence.

## Logging
------

The simulator logs the state of the traffic light at each interval. You can access the log by calling the `getLogs` function.

## Example Usage
-------------

Here's an example of how to use the simulator:
```javascript
import { useMachine } from './useMachine';

const machine = useMachine();
machine.start();

// To customize the sequence of lights
const machine = useMachine(['red', 'yellow', 'green']);
machine.start();
```