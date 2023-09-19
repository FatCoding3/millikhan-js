import { useState } from "react"
import { VelocitiesDataItem } from "../../model/oil-drop"
import { CSVLink } from 'react-csv'

export interface InputItem {
  id: number,
  electronicIntensity: number,
  velocitiesData: VelocitiesDataItem[]
}

export type DeleteInfo = {[key: string]: number}

export interface CalculatedDataItem {
  id: string
  velocity1: number,
  velocity2: number
  electronicIntensity: number,
  calCharges: number,
}

export interface DataValidationProps {
  data:  CalculatedDataItem[],
  applyDelete: (deleteInfo: DeleteInfo) => void,
  showGraph: () => void,
}

export const DataValidation = (props: DataValidationProps) => {

  const [deleteInfo, setDeleteInfo] = useState<DeleteInfo>({})

  function changeDelete(id: string, checked: boolean) {
    const copyDeleteInfo = {...deleteInfo};
    if (checked) copyDeleteInfo[id] = 0;
    if (!checked) delete copyDeleteInfo[id];
    setDeleteInfo(copyDeleteInfo);
  }

  function getCSVLink() {
    const data = [];

    const header = ['id', 'velocity1', 'velocity2', 'E', 'calQ'];
    data.push(header);

    for (const item of props.data) {
      const dataItem = [item.id, item.velocity1, item.velocity2, item.electronicIntensity, item.calCharges];
      data.push(dataItem)
    }

    return (
      <CSVLink 
        data={data} 
        filename="millikhanjs-data.csv" 
        enclosingCharacter={``}
      >
        Download
      </CSVLink>
    )
  }

  return (
    <div className="w-full h-full flex flex-col">
      <div
        className='w-full flex h-[40px] bg-gray-200 overflow-y-scroll'
      >
        <div className="w-[5%] flex items-center justify-center border-[1px] border-gray-300"></div>
        <div className="w-[19%] flex items-center justify-center border-[1px] border-gray-300">id</div>
        <div className="w-[19%] flex items-center justify-center border-[1px] border-gray-300">V1</div>
        <div className="w-[19%] flex items-center justify-center border-[1px] border-gray-300">V2</div>
        <div className="w-[19%] flex items-center justify-center border-[1px] border-gray-300">E</div>
        <div className="w-[19%] flex items-center justify-center border-[1px] border-gray-300">cal Q</div>
      </div>

      <div className="h-[400px] overflow-y-scroll border-b-2 border-gray-300">
        {
          props.data.map((item) => (
            <ThisDataItem item={item} changeDelete={changeDelete}/>
          ))
        }
      </div>

      <div className="flex gap-6 items-center justify-center w-full h-[80px]">
        <button 
          className={
            "w-[120px] h-[40px] bg-green-600 text-white rounded-full font-bold text-sm hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 "
            + (Object.keys(deleteInfo).length > 0 ? 'hidden' : '')
          }
          onClick={() => props.showGraph()}
        >
          Show graph
        </button>

        <button 
          className={
            "w-[120px] h-[40px] bg-red-600 text-white rounded-full font-bold text-md hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 "
            + (Object.keys(deleteInfo).length > 0 ? '' : 'hidden')
          }
          onChange={() => props.applyDelete(deleteInfo)}
        >
          Delete
        </button>

        <div
          className={
            "w-[120px] h-[40px] bg-blue-600 text-white rounded-full font-bold text-sm hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 flex items-center justify-center "
            + (Object.keys(deleteInfo).length > 0 ? 'hidden' : '')
          }
        >
          {getCSVLink()}
        </div>
      </div>
    </div>
  )
}

const ThisDataItem = (props: { 
  item: CalculatedDataItem, 
  changeDelete: (id: string, checked: boolean) => void,
}) => {
  const item = props.item;
  return (
    <div
        id={item.id}
        className='w-full flex h-[40px]'
      >
        <div className="w-[5%] flex items-center justify-center border-[1px]">
          <input 
            type="checkbox" 
            content="X"
            className="w-4 h-4 text-red-600 bg-gray-100 border-gray-100 rounded focus:ring-red-500 focus:ring-2 accent-red-500"
            onChange={(e) => {props.changeDelete(item.id, e.target.checked)}}
          />
        </div>
        <div className="w-[19%] flex items-center justify-center border-[1px]">{item.id}</div>
        <div className="w-[19%] flex items-center justify-center border-[1px]">{item.velocity1}</div>
        <div className="w-[19%] flex items-center justify-center border-[1px]">{item.velocity2}</div>
        <div className="w-[19%] flex items-center justify-center border-[1px]">{item.electronicIntensity}</div>
        <div className="w-[19%] flex items-center justify-center border-[1px]">
          {toFixed(item.calCharges, 4)}
        </div>
      </div>
  )
}

const toFixed = (num: Number, decimal: number) => {
  const stringNumber = String(num);
  const [numPart, ePart] = stringNumber.split('e');
  const [realPart, decimalPart] = numPart.split('.');
  const newEPart = (ePart) ? 'e' + ePart : '';
  const newDecimalPart = (decimalPart) ? '.' + decimalPart.slice(0, decimal) : ''
  return realPart + newDecimalPart + newEPart;
}