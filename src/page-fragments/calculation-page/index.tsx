import React, { useState } from "react"
import { CalculatedDataItem, DataValidation } from "./data-validation"
import { CheckE } from "../../components/check-e";
import { FindingE } from "./finding-e";

export interface RawDataItem {
  electronicIntensity: number,
  oilData: {
    id: number,
    velocity1: number,
    velocity2: number,
    charges: number,
  }[]
}

const getCalculatedData = (rawData: RawDataItem[], choosingData: {[key: number]: number}) => {
  const calculatedData: CalculatedDataItem[] = [];
  for (const key of Object.keys(choosingData)) {
    const index = parseInt(key);
    rawData[index].oilData.forEach((item) => {
      calculatedData.push({
        id: index + '-' + item.id,
        velocity1: item.velocity1,
        velocity2: item.velocity2,
        calCharges: item.charges,
        electronicIntensity: rawData[index].electronicIntensity
      })
    })
  }
  return calculatedData;
}

export const CalculationPage = (props: {data: RawDataItem[], numExp: number}) => {
  const [choosingData, setChoosingData] = useState<{[key: number]: number}>({})

  const changeChoosingData = (index: number, checked: boolean) => {
    const copyChoosingData = {...choosingData};
    if (checked) copyChoosingData[index] = 1;
    if (!checked) delete copyChoosingData[index];
    setChoosingData(copyChoosingData);
  }

  const getExpCheckBoxes = (numExp: number) => {
    const checkboxes: React.ReactNode[] = []
    for (let i = 0; i < numExp; i++) {
      checkboxes.push(<ExpCheckbox index={i+1} onChange={changeChoosingData}/>)
    }
    return checkboxes
  }

  return (
    <div className="w-full h-full flex pr-5 ">
      <div className="flex flex-col h-full w-[70%] items-center justify-center">
        <div className="w-[95%] h-[90%] pt-[30px]">
          <FindingE calculatedData={getCalculatedData(props.data, choosingData)}/>
        </div>
      </div>

      <div
        id='choosing-input'
        className="flex h-full w-[30%] items-center justify-center"
      >
        <div className="bg-gray-300 h-[90%] w-[90%] rounded-lg p-10 flex flex-col gap-5 overflow-auto">
          <div className="text-3xl font-bold w-fit text-blue-600">
            <div>Choose experiments</div>
            <div>to consider</div>
          </div>
          {getExpCheckBoxes(props.numExp)}
        </div>
      </div>
    </div>
  )
}

export const ExpCheckbox = (props: { index: number, onChange: (index: number, value: boolean) => void }) => {
  return (
    <div className="flex items-center gap-3">
      <input 
        type="checkbox" 
        className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-100 rounded focus:ring-blue-500 focus:ring-2 accent-blue-500"
        onChange={(e) => {props.onChange(props.index - 1, e.target.checked)}}
      />
      <label className="text-xl">{'Experiment ' + props.index}</label>
    </div>
  )
}