
import React, { useState, createContext } from 'react';
import { MeasurementPage } from './page-fragments/measurement-page';
import { CalculatedDataItem, DataValidation, DeleteInfo } from './page-fragments/calculation-page/data-validation';
import { CalculationPage, RawDataItem } from './page-fragments/calculation-page';
import { VelocitiesDataItem } from './model/oil-drop';
import { calculateCharges } from './model/calculation-lib';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';

import zoomPlugin from 'chartjs-plugin-zoom';

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend, zoomPlugin);

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
        copyOilData.push({...item})
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
          className={
            'w-[120px] h-[30px] rounded-bl-xl ' 
            + (isCalculate ? 'bg-gray-200 text-gray-600 ' : 'bg-blue-600 text-white ' )
          }
          onClick={() => setIsCalculate(false)}
        >Measurement</button>
        <button 
          className={
            'w-[120px] h-[30px] rounded-br-xl ' 
            + (!isCalculate ? 'bg-gray-200 text-gray-600 ' : 'bg-blue-600 text-white ' )
          }
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

export default App;
