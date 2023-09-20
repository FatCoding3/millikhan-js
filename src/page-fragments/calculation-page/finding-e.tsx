import { useState } from "react";
import { CheckE } from "../../components/check-e";
import { CalculatedDataItem, DataValidation } from "./data-validation";
import { ShowingGraph } from "./showing-graph";

export const FindingE = (props: {calculatedData: CalculatedDataItem[]}) => {

  const [showGraph, setShowGraph] = useState(false);

  const charges = props.calculatedData.map((item) => item.calCharges);

  return (
    <div className="w-full h-full flex flex-col px-10">
      <div className={(showGraph ? 'hidden' : '')}>
        <DataValidation data={props.calculatedData} showGraph={() => {setShowGraph(true)}}/>
      </div>

      <div className={(showGraph ? '' : 'hidden')}>
        <ShowingGraph data={props.calculatedData} showDataTable={() => {setShowGraph(false)}}/>
      </div>

      <CheckE charges={charges}/>
    </div>
  )
}