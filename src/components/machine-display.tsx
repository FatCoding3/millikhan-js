import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import { Machine, MachineInitialData } from "../model/machine";
import { ElectronShooter } from "../model/electron-shooter";
import Konva from "konva";
import { OilDrop } from "../model/oil-drop";

interface MachineDisplayProps {
  machineData?: MachineInitialData;
}

export const MachineDisplay = (props: MachineDisplayProps) => {
  // get height and width
  const ref = useRef<HTMLDivElement>(null);

  const [time, setTime] = useState(0)
  const [machine, setMachine] = useState(
    createTestMachine()
  )
  const [running, setRunning] = useState(true);

  useEffect(() => {
    console.log('width',ref && ref.current ? ref.current.offsetWidth : -1 );
    const width = ref.current ? ref.current.offsetWidth : -1;
    const height = ref.current ? ref.current.offsetHeight : -1;
    const yRescale = 250;
    const oilSizeRescale = 0.5e5;

    
    const stage = new Konva.Stage({
      container: 'container',
      width: width,
      height: machine.total_height*yRescale,
    });

    var layer = new Konva.Layer();
    stage.add(layer);

    const oilsAppearance: {[key: number]: Konva.Circle} = {}

    const electronBeam = new Konva.Rect({
      x: 0,
      y: (machine.total_height - machine.electron_shooter.height)*yRescale,
      width: stage.width(),
      height: machine.electron_shooter.radius*1500,
      fill: '#ffe6e6',
    });
    // add the shape to the layer
    layer.add(electronBeam);

    function createOilAppearance(oil: OilDrop) {
      oilsAppearance[oil.id] = new Konva.Circle({
        id: 'oil-appearance-' + oil.id,
        x: stage.width() / 2 + (Math.random() - 0.5)*80,
        y: 0,
        radius: oil.radius * oilSizeRescale,
        fill: '#FFA500',
        shadowColor: '#1aff66',
        shadowOpacity: 1,
        shadowBlur: 3,
        shadowEnabled: false
      });

      layer.add(oilsAppearance[oil.id]);
      layer.draw();
    }

    function moveOilAppearance() {
      for (const key of Object.keys(oilsAppearance)) {
        const id = parseInt(key);
        
        if (!machine.existing_oils[id]) {
          oilsAppearance[id].destroy();
          layer.draw();
          continue;
        }

        if (oilsAppearance[id].y() > electronBeam.y() && !oilsAppearance[id].shadowEnabled())
          oilsAppearance[id].shadowEnabled(true);

        oilsAppearance[id].y(
          (machine.total_height - machine.existing_oils[id].height) * yRescale
        )
      }
    }

    const generateOilInterval = setInterval(() => {
      const id = machine.generateOil();
      createOilAppearance(machine.existing_oils[id]);
    }, 5000)

    const movementInterval = setInterval(() => {
      machine.timeEvolution(0.001);
      moveOilAppearance();
      setTime(time => time + 0.001);
    }, 5);

    return () => {
      stage.remove();
      clearInterval(movementInterval);
      clearInterval(generateOilInterval);
    }
  }, []);

  return (
    <div ref={ref}  className="w-[500px] h-[100px]">
      <div id="container" className="border-2 border-solid"/>
    </div>
  )
}

function createTestMachine() {
  const electronShooter = new ElectronShooter(1e10, 0.005, 1);
  const machine = new Machine({
    total_height: 2,
    electronic_height: 0.4,
    electronic_voltage: 50000,
    electron_shooter: electronShooter
  })

  return machine;
}