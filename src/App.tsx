
import React, { useEffect, useState } from 'react';
import { MachineDisplay } from './components/machine-display';
import { RangeInput } from './components/range-input';
import { MeasurementPage } from './page-fragments/measurement-page';

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

      <MeasurementPage/>
    </div>
  );
}

export default App;
