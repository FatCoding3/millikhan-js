import React, { useEffect, useState } from "react";
import { Machine, MachineInitialData } from "../model/machine";
import { ElectronShooter } from "../model/electron-shooter";

interface MachineDisplayProps {
  machineData?: MachineInitialData;
}

export const MachineDisplay = (props: MachineDisplayProps) => {
  const [time, setTime] = useState(0)
  const [machine, setMachine] = useState(
    createTestMachine()
  )

  useEffect(() => {
    console.log('hello');
    const movementInterval = setInterval(() => {
      machine.timeEvolution(0.001);
      setTime(time => time + 0.001);
    }, 10);
    const generateOilInterval = setInterval(() => {
      machine.generateOil();
    }, 1000)
    return () => {
      clearInterval(movementInterval);
      clearInterval(generateOilInterval);
    };
  }, []) 

  return (
    <div>hello iam display</div>
  )
}

function createTestMachine() {
  const electronShooter = new ElectronShooter(1e9, 0.005, 1);
  const machine = new Machine({
    total_height: 2,
    electronic_height: 0.4,
    electronic_voltage: 50000,
    electron_shooter: electronShooter
  })

  machine.generateOil();
  return machine;
}