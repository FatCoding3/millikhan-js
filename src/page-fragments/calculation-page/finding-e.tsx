import { CheckE } from "../../components/check-e";
import { CalculatedDataItem, DataValidation } from "./data-validation";

export const FindingE = (props: {calculatedData: CalculatedDataItem[]}) => {

  const charges = props.calculatedData.map((item) => item.calCharges);

  return (
    <div className="w-full h-full flex flex-col px-10">
      <DataValidation data={props.calculatedData} showGraph={() => {}}/>
      <CheckE charges={charges}/>
    </div>
  )
}