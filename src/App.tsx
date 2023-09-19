
import React, { useEffect, useState } from 'react';
import { MachineDisplay } from './components/machine-display';
import { RangeInput } from './components/range-input';
import { MeasurementPage } from './page-fragments/measurement-page';
import { CalculatedDataItem, DataValidation } from './page-fragments/calculation-page/data-validation';

function App() {
  return (
    <div className='w-[100vw] h-[100vh]'>
      {/* <MachineDisplay 
        machineData={{
          total_height: 1,
          electronic_height: 0.4,
          electronic_voltage: 50000,
          oil_radius_level: 2
        }}
        electronShooterData={{
          wattage: 1e10, 
          radius: 0.005, 
          height: 0.5
        }}
        generateOilEach={5000}
        report={(report) => {}}
        running={true}
      /> */}

      {/* <div className='w-[500px]'>
        <RangeInput
          name={'test'}
          minValue={5}
          maxValue={10}
          defaultValue={6}
          step={1}
          setInput={(v) => console.log(v)}
        />
      </div> */}

      {/* <MeasurementPage addSummaryData={(data) => {}}/> */}

      <DataValidation data={sampleData} applyDelete={(item) => {}} showGraph={() => {}}/>
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
