import React, { useRef, useState } from "react";
import { RangeInput } from "../components/range-input";
import { MachineDisplay } from "../components/machine-display";
import { CustomButton } from "../components/custom-button";
import { ReportBox, ReportData } from "../components/report-box";
import { VelocitiesDataItem } from "../model/oil-drop";
import { ShowingData } from "../components/showing-data";

export interface MeasurementPageProps {
   addSummaryData: (data: VelocitiesDataItem[], intensity: number) => void
}

export const MeasurementPage = (props: MeasurementPageProps) => {
  const [machineTotalHeight, setMachineTotalHeight] = useState(1.2);
  const [machineElectronicHeight, setMachineElectronicHeight] = useState(0.4);
  const [machineElectronicVoltage, setMachineElectronicVoltage] = useState(50000);
  const [machineOilRadiusLevel, setMachineOilRadiusLevel] = useState(2);
  const [electronShooterWattage, setElectronShooterWattage] = useState(1);
  const [electronBeamRadius, setElectronBeamRadius] = useState(5);
  const [electronShooterHeight, setElectronShooterHeight] = useState(0.5);
  const [generateOilEach, setGenerateOilEach] = useState(3000);
  const [timeMoving, setTimeMoving] = useState(4);
  const [scale, setScale] = useState(1);
  const [running, setRunning] = useState(false);

  const [summaryData, setSummaryData] = useState<VelocitiesDataItem[]>([])
  const [report, setReport] = useState([0, 0, 0])

  const sendingData = useRef<VelocitiesDataItem[]>([])
  const updateSendingData = (item: VelocitiesDataItem) => {
    sendingData.current = [...sendingData.current, item]
  }
  
  return (
    <div className="flex flex-row h-full w-full items-center pr-5">
      <div
        id='machine-part'
        className="w-[70%] h-full z-0 flex items-center justify-center"
      >
        <MachineDisplay 
          totalHeight={machineTotalHeight}
          electronicHeight={machineElectronicHeight}
          electronicVoltage={machineElectronicVoltage}
          oilRadiusLevel={machineOilRadiusLevel}
          electronBeamRadius={electronBeamRadius * 1e-3}
          electronShooterWattage={electronShooterWattage * 1e9}
          electronShooterHeight={electronShooterHeight}
          generateOilEach={generateOilEach}
          timeMoving={timeMoving/4}
          running={running}
          scale={scale}
          report={(reportData) => {setReport(reportData)}}
          setSummaryData={(summaryData) => {setSummaryData(summaryData)}}
          updateSendingData={updateSendingData}
        />
      </div>

      <div
        id='control-part'
        className="h-full w-[30%] flex items-center justify-center z-10"
      >
        <div
          id='control-panel'
          className="bg-gray-300 h-[90%] w-[90%] rounded-lg overflow-hidden"
        >
          <div
            id='input'
            className={"flex flex-col w-full h-full p-4 pb-5 gap-[1%] overflow-auto " + (running ? 'hidden ' : '')}
          >
            <RangeInput name={'Machine height'} minValue={0.2} maxValue={4} input={machineTotalHeight} step={0.01} unit={'m'} setInput={(v) => setMachineTotalHeight(v)}/>
            <RangeInput name={'Electronic field height'} minValue={0.1} maxValue={machineTotalHeight} input={machineElectronicHeight} step={0.01} unit={'m'} setInput={(v) => setMachineElectronicHeight(v)}/>
            <RangeInput name={'Electronic Voltage'} minValue={10000} maxValue={100000} input={machineElectronicVoltage} step={1000} unit={'V'} setInput={(v) => setMachineElectronicVoltage(v)}/>
            <RangeInput name={'Oil radius level'} minValue={1} maxValue={4} input={machineOilRadiusLevel} step={1} setInput={(v) => setMachineOilRadiusLevel(v)}/>
            <RangeInput name={'Generate oil each'} minValue={200} maxValue={10000} input={generateOilEach} step={200} unit={'ms'} setInput={(v) => setGenerateOilEach(v)}/>
            <RangeInput name={'E shooter wattage'} minValue={0.1} maxValue={10} input={electronShooterWattage} step={0.1} unit={' x 10^6 e/ms'} setInput={(v) => setElectronShooterWattage(v)}/>
            <RangeInput name={'Electron shooter y position'} minValue={0.1} maxValue={machineTotalHeight} input={electronShooterHeight} step={0.01} setInput={(v) => setElectronShooterHeight(v)}/>
            <RangeInput name={'Electron beam radius'} minValue={1} maxValue={10} input={electronBeamRadius} step={0.5} unit={'mm'} setInput={(v) => setElectronBeamRadius(v)}/>
            
            <div className="flex">
              <div className="w-[45%]">
                <RangeInput name={'Time moving'} minValue={1} maxValue={10} input={timeMoving} step={1} setInput={(v) => setTimeMoving(v)}/>
              </div>

              <div className="ml-auto w-[45%]">
                <RangeInput name={'Zoom'} minValue={1} maxValue={3} input={scale} step={0.2} setInput={(v) => setScale(v)}/>
              </div>
            </div>

            <div className="flex flex-col w-full items-center justify-center h-full">
              <CustomButton onchange={() => setRunning(true)}>
                Run
              </CustomButton>
            </div>
          </div>

          <div
            id='console-running'
            className={'flex flex-col w-full h-full ' + (running ? '' : 'hidden ')}
          >
            <div
              id = 'running-report'
              className='h-fit'
            >
              <ReportBox data={report}/>
            </div>

            <div
              id = 'showing-data'
            >
              <ShowingData data={summaryData}/>
            </div>

            <div className="flex flex-col w-full items-center justify-center h-full">
              <CustomButton 
                onchange={() => {
                  setRunning(false);
                  props.addSummaryData(sendingData.current, machineElectronicVoltage/machineElectronicHeight);
                  sendingData.current = [];
                }}
              >
                Stop running
              </CustomButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}