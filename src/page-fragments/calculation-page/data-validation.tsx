import { useContext, useState } from "react"
import { VelocitiesDataItem } from "../../model/oil-drop"
import { CSVLink } from 'react-csv'
import { ApplyDeleteContext } from "../../App"
import { toFixed } from "../../helper/to-fixed"

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
  showGraph: () => void,
}

export const DataValidation = (props: DataValidationProps) => {

  const applyDelete = useContext(ApplyDeleteContext);

  const [deleteInfo, setDeleteInfo] = useState<DeleteInfo>({});

  function changeDelete(id: string, checked: boolean) {
    const copyDeleteInfo = {...deleteInfo};
    if (checked) copyDeleteInfo[id] = 1;
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
        Download csv
      </CSVLink>
    )
  }

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full h-fit border-2 border-gray-300">
        <div
          className='w-full flex h-[40px] bg-gray-200 overflow-y-scroll'
        >
          <div className="w-[5%] flex items-center justify-center border-[1px] border-gray-300 border-l-0 border-t-0"></div>
          <div className="w-[19%] flex items-center justify-center border-[1px] border-gray-300 border-t-0">id</div>
          <div className="w-[19%] flex items-center justify-center border-[1px] border-gray-300 border-t-0">V1</div>
          <div className="w-[19%] flex items-center justify-center border-[1px] border-gray-300 border-t-0">V2</div>
          <div className="w-[19%] flex items-center justify-center border-[1px] border-gray-300 border-t-0">E</div>
          <div className="w-[19%] flex items-center justify-center border-[1px] border-gray-300 border-t-0">cal Q</div>
        </div>

        <div className="h-[400px] overflow-y-scroll">
          {
            props.data.map((item) => (
              <ThisDataItem item={item} changeDelete={changeDelete} deleteInfo={deleteInfo}/>
            ))
          }
          <div 
            className={
              "w-full h-full flex items-center justify-center text-4xl font-bold text-gray-400 "
              + (props.data.length > 0 ? 'hidden' : '')
            }
          >
            No data to show
          </div>
        </div>
      </div>

      <div className="flex gap-6 items-center justify-center w-full h-[80px]">
        <button 
          disabled={props.data.length <= 0}
          className={
            "w-[120px] h-[40px] bg-green-600 text-white rounded-full font-bold text-sm hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 "
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
          onClick={() => {
            setDeleteInfo({});
            applyDelete(deleteInfo);
          }}
        >
          Delete
        </button>

        <div
          className={
            "w-[120px] h-[40px] bg-blue-600 text-white rounded-full font-bold text-sm hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 flex items-center justify-center "
            + (Object.keys(deleteInfo).length > 0 ? 'hidden' : '')
          }
        >
          {props.data.length <= 0 ? <button disabled={true}>Download csv</button> : getCSVLink()}
        </div>
      </div>
    </div>
  )
}

const ThisDataItem = (props: { 
  item: CalculatedDataItem, 
  changeDelete: (id: string, checked: boolean) => void,
  deleteInfo: DeleteInfo,
}) => {
  const item = props.item;

  return (
    <div
        id={item.id}
        className='w-full flex h-[40px]'
      >
        <div className="w-[5%] flex items-center justify-center border-[1px]">
          <input 
            id={item.id + '-checkbox'}
            type="checkbox"
            checked={Boolean(props.deleteInfo[item.id])}
            className="w-4 h-4 text-red-600 bg-gray-100 border-gray-100 rounded focus:ring-red-500 focus:ring-2 accent-red-500"
            onChange={(e) => {
              props.changeDelete(item.id, e.target.checked);
            }}
          />
        </div>
        <div className="w-[19%] flex items-center justify-center border-[1px]">{item.id}</div>
        <div className="w-[19%] flex items-center justify-center border-[1px]">{item.velocity1.toFixed(6)}</div>
        <div className="w-[19%] flex items-center justify-center border-[1px]">{item.velocity2.toFixed(6)}</div>
        <div className="w-[19%] flex items-center justify-center border-[1px]">
          {toFixed(item.electronicIntensity, 3)}
        </div>
        <div className="w-[19%] flex items-center justify-center border-[1px]">
          {toFixed(item.calCharges, 6)}
        </div>
      </div>
  )
}