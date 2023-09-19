
import React, { useState, createContext } from 'react';
import { MachineDisplay } from './components/machine-display';
import { RangeInput } from './components/range-input';
import { MeasurementPage } from './page-fragments/measurement-page';
import { CalculatedDataItem, DataValidation, DeleteInfo } from './page-fragments/calculation-page/data-validation';
import { CalculationPage, RawDataItem } from './page-fragments/calculation-page';
import { VelocitiesDataItem } from './model/oil-drop';
import { calculateCharges } from './model/calculation-lib';

export const ApplyDeleteContext = createContext((deleteInfo: DeleteInfo) => {});

function App() {

  const [rawData, setRawData] = useState<RawDataItem[]>([]);
  const [isCalculate, setIsCalculate] = useState(false);
  const [numExp, setNumExp] = useState(0)

  const applyDeleteData = (deleteInfo: DeleteInfo) => {
    const copyRawData: RawDataItem[] = []

    for (let i = 0; i < rawData.length; i++) {
      const copyOilData = []
      for (const item of rawData[i].oilData) {
        if (deleteInfo[(i + '-' + item.id)]) continue;
        copyOilData.push(item)
      }
      copyRawData.push({ 
        electronicIntensity: rawData[i].electronicIntensity,
        oilData: copyOilData,
      })
    }

    setRawData(copyRawData);
  }

  const addRawData = (item: RawDataItem) => {
    setRawData([...rawData, item]);
  }

  const summitVelocitiesData =(velocitiesData: VelocitiesDataItem[], intensity: number) => {
    const rawDataItem: RawDataItem = {
      electronicIntensity: intensity,
      oilData: velocitiesData.map((item) => ({
        id: item.id,
        velocity1: item.terminal_velocities[0],
        velocity2: item.terminal_velocities[1],
        charges: calculateCharges(item.terminal_velocities[0], item.terminal_velocities[1], intensity)
      }))
    }
    
    addRawData(rawDataItem);
    setNumExp(numExp + 1)
  }

  return (
    <div className='w-[100vw] h-[100vh]'>
      <div id='change-button' className='absolute top-0 left-0 w-[70%] h-fit flex justify-center z-20'>
        <button 
          onClick={() => setIsCalculate(false)}
        >Measurement</button>
        <button 
          onClick={() => setIsCalculate(true)}
        >Calculation</button>
      </div>
      
      <div className={'w-full h-full ' + (isCalculate ? 'hidden' : '')}>
        <MeasurementPage addSummaryData={summitVelocitiesData}/>
      </div>
      
      <div className={'w-full h-full ' + (isCalculate ? '' : 'hidden')}>
        <ApplyDeleteContext.Provider value={applyDeleteData}>
          <CalculationPage data={rawData} numExp={numExp}/>
        </ApplyDeleteContext.Provider>
      </div>
    </div>
  );
}

const sampleData: CalculatedDataItem[] = [
  { id: '0-0', velocity1: 0.1, velocity2: 0.2, electronicIntensity: 0.3, calCharges: (0.4543656556565767686563634e-9) },
  { id: '0-1', velocity1: 0.1, velocity2: 0.2, electronicIntensity: 0.3, calCharges: 0.4 },
  { id: '0-2', velocity1: 0.1, velocity2: 0.2, electronicIntensity: 0.3, calCharges: 0.4 },
  { id: '1-0', velocity1: 0.1, velocity2: 0.2, electronicIntensity: 0.3, calCharges: 0.4 },
  { id: '1-1', velocity1: 0.1, velocity2: 0.2, electronicIntensity: 0.3, calCharges: 0.4 },
  { id: '1-2', velocity1: 0.1, velocity2: 0.2, electronicIntensity: 0.3, calCharges: 0.4 },
  { id: '2-0', velocity1: 0.1, velocity2: 0.2, electronicIntensity: 0.3, calCharges: 0.4 },
  { id: '2-1', velocity1: 0.1, velocity2: 0.2, electronicIntensity: 0.3, calCharges: 0.4 },
  { id: '2-2', velocity1: 0.1, velocity2: 0.2, electronicIntensity: 0.3, calCharges: 0.4 },
  { id: '3-0', velocity1: 0.1, velocity2: 0.2, electronicIntensity: 0.3, calCharges: 0.4 },
  { id: '3-1', velocity1: 0.1, velocity2: 0.2, electronicIntensity: 0.3, calCharges: 0.4 },
  { id: '3-2', velocity1: 0.1, velocity2: 0.2, electronicIntensity: 0.3, calCharges: 0.4 },
  { id: '4-0', velocity1: 0.1, velocity2: 0.2, electronicIntensity: 0.3, calCharges: 0.4 },
  { id: '4-1', velocity1: 0.1, velocity2: 0.2, electronicIntensity: 0.3, calCharges: 0.4 },
  { id: '4-2', velocity1: 0.1, velocity2: 0.2, electronicIntensity: 0.3, calCharges: 0.4 },
  { id: '5-0', velocity1: 0.1, velocity2: 0.2, electronicIntensity: 0.3, calCharges: 0.4 },
  { id: '5-1', velocity1: 0.1, velocity2: 0.2, electronicIntensity: 3000, calCharges: 0.4 },
  { id: '5-2', velocity1: 0.1, velocity2: 0.2, electronicIntensity: 0.3, calCharges: 0.4 },
  { id: '6-0', velocity1: 0.1, velocity2: 0.2, electronicIntensity: 0.3, calCharges: 0.4 },
  { id: '6-1', velocity1: 0.1, velocity2: 0.2, electronicIntensity: 0.3, calCharges: 0.4 },
  { id: '6-2', velocity1: 0.1, velocity2: 0.2, electronicIntensity: 0.3, calCharges: 0.4 },
  { id: '7-0', velocity1: 0.1, velocity2: 0.2, electronicIntensity: 0.3, calCharges: 0.4 },
  { id: '7-1', velocity1: 0.1, velocity2: 0.2, electronicIntensity: 0.3, calCharges: 0.4 },
  { id: '7-2', velocity1: 0.1, velocity2: 0.2, electronicIntensity: 0.3, calCharges: 0.4 },
] 

export default App;
