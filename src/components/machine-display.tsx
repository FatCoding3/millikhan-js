import React, { useEffect, useState, useRef } from 'react';
import { Machine, MachineInitialData } from "../model/machine";
import { ElectronShooter, ElectronShooterInitData } from "../model/electron-shooter";
import Konva from "konva";
import { OilDrop } from "../model/oil-drop";

interface MachineDisplayProps {
  totalHeight: number;
  electronicHeight: number;
  electronicVoltage: number;
  oilRadiusLevel: number;
  electronShooterWattage: number;
  electronBeamRadius: number;
  electronShooterHeight: number;
  generateOilEach: number;
  timeMoving: number;
  scale: number;
  running: boolean;
  report: (report: {[key: number]: number}) => void;
}

export const MachineDisplay = (props: MachineDisplayProps) => {
  // get height and width
  const ref = useRef<HTMLDivElement>(null);

  const [time, setTime] = useState(0)
  // const [machine, setMachine] = useState(
    
  //   )
  // )

  useEffect(() => {
    const width = ref.current ? ref.current.clientWidth : -1;
    const yRescale = 250 * props.scale;
    const oilSizeRescale = 0.5e5 * props.scale;
    const beamRescale = 1500 * props.scale; 

    const machine = createTestMachine(
      {
        total_height: props.totalHeight,
        electronic_height: props.electronicHeight,
        electronic_voltage: props.electronicVoltage,
        oil_radius_level: props.oilRadiusLevel
      },
      {
        wattage: props.electronShooterWattage, 
        radius: props.electronBeamRadius, 
        height: props.electronShooterHeight
      }
    );

    const timeSlower = (props.timeMoving < 1) ? props.timeMoving : 1;
    const timeFaster = (props.timeMoving > 1) ? props.timeMoving : 1;

    const maxOils = 30;

    
    const stage = new Konva.Stage({
      container: 'container',
      width: width,
      height: machine.total_height*yRescale + 25,
    });

    var layer = new Konva.Layer();
    stage.add(layer);

    const oilsAppearance: {[key: number]: Konva.Circle} = {}

    const upperLeftElectronicBorder = new Konva.Rect({
      id: 'upper-left-electronic-layer',
      x: 0,
      y: (machine.total_height - machine.electronic_height)*yRescale - 20,
      width: stage.width()/2 - 50,
      height: 20,
      fill: '#7575a3',
    });

    const upperRightElectronicBorder = new Konva.Rect({
      id: 'upper-right-electronic-layer',
      x: stage.width()/2 + 50,
      y: (machine.total_height - machine.electronic_height)*yRescale - 20,
      width: stage.width()/2 - 50,
      height: 20,
      fill: '#7575a3',
    });

    const lowerElectronBorder = new Konva.Rect({
      id: 'lower-electronic-layer',
      x: 0,
      y: stage.height() - 20,
      width: stage.width(),
      height: 20,
      fill: '#7575a3',
    });

    const positiveChargeSymbol = new Konva.Text({
      x: stage.width() - 20,
      y: (machine.total_height - machine.electronic_height)*yRescale- 25,
      text: '+',
      fontSize: 30,
      fontFamily: 'Calibri',
      fill: '#cc0000',
    })

    const negativeChargeSymbol = new Konva.Text({
      x: stage.width() - 20,
      y: stage.height() - 28,
      text: '-',
      fontSize: 40,
      fontFamily: 'Calibri',
      fill: '#cc0000',
    })

    const electronicFieldAppearance = new Konva.Rect({
      id: 'lower-electronic-layer',
      x: 0,
      y: (machine.total_height - machine.electronic_height)*yRescale,
      width: stage.width(),
      height: (machine.electronic_height)*yRescale + 5,
      fill: '#f0f0f9',
    });

    const electronBeam = new Konva.Rect({
      id: 'electron-beam',
      x: 0,
      y: (machine.total_height - machine.electron_shooter.height)*yRescale - machine.electron_shooter.radius*beamRescale/2,
      width: stage.width(),
      height: machine.electron_shooter.radius*beamRescale,
      fill: '#ffe6e6',
    });

    const electronShooterPartOne = new Konva.Rect({
      x: 0,
      y: (machine.total_height - machine.electron_shooter.height)*yRescale - machine.electron_shooter.radius*beamRescale*2,
      width: machine.electron_shooter.radius*beamRescale*5,
      height: machine.electron_shooter.radius*beamRescale*4,
      fill: 'black',
      cornerRadius: 5,
    });

    const electronShooterPartTwo = new Konva.Shape({
      sceneFunc: function (context, shape) {
        const middleY = (machine.total_height - machine.electron_shooter.height)*yRescale;
        const smallEdge = machine.electron_shooter.radius * beamRescale * 1.5
        const bigEdge = machine.electron_shooter.radius * beamRescale * 3
        const smallX = machine.electron_shooter.radius * beamRescale * 5
        const bigX = machine.electron_shooter.radius * beamRescale * 7

        context.beginPath();
        context.moveTo(smallX, middleY + smallEdge/2);
        context.lineTo(bigX, middleY + bigEdge/2);
        context.lineTo(bigX, middleY - bigEdge/2);
        context.lineTo(smallX, middleY - smallEdge/2);
        context.closePath();

        // (!) Konva specific method, it is very important
        context.fillStrokeShape(shape);
      },
      fill: 'black',
    });

    // add the shape to the layer
    layer.add(
      upperLeftElectronicBorder,
      upperRightElectronicBorder,
      lowerElectronBorder,
      electronicFieldAppearance,
      electronBeam,
      electronShooterPartOne,
      electronShooterPartTwo,
      positiveChargeSymbol,
      negativeChargeSymbol,
    );

    if (!props.running) return () => stage.remove();

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
          delete oilsAppearance[id];
          layer.draw();
          console.log(key)
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
      if (Object.keys(machine.existing_oils).length > maxOils)
        return;
      const id = machine.generateOil();
      createOilAppearance(machine.existing_oils[id]);
    }, 2 * props.generateOilEach * timeSlower / timeFaster);

    const movementInterval = setInterval(() => {
      for (let i = 0; i < timeFaster; i++) {
        props.report(machine.timeEvolution(0.002));
        moveOilAppearance();
      }
      setTime(time => time + 0.002);
    }, Math.round(2/timeSlower));

    return () => {
      stage.remove();
      clearInterval(movementInterval);
      clearInterval(generateOilInterval);
    }
  }, [props]);

  return (
    <div 
      ref={ref}  
      className={"h-fit p-0 border-x-8 border-t-2 border-solid border-gray-500 "}
      style={{
        width: 400 * props.scale
      }}
    >
      <div id="container"/>
      <div className='ml-3'>{time > 0 ? `Time passed: ${time.toFixed(3)}s` : '  Sample'}</div>
    </div>
  )
}

function createTestMachine(machineData: MachineInitialData, electronShooterData: ElectronShooterInitData) {
  const electronShooter = new ElectronShooter(electronShooterData);
  const machine = new Machine({
    ...machineData,
    electron_shooter: electronShooter,
  })

  return machine;
}