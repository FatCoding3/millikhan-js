import { useState } from "react";
import { VelocitiesDataItem } from "../model/oil-drop";

export const ShowingData = (props: { data: VelocitiesDataItem[] }) => {
  
  const maxColumnShow = 6

  const getShowingData = () => {
    if (props.data.length < maxColumnShow) {
      const samples = Array<VelocitiesDataItem>(maxColumnShow - props.data.length).fill(
        { id: NaN, terminal_velocities: [NaN, NaN] }
      )
      return [...props.data.reverse(), ...samples];
    }
    
    if (props.data.length == maxColumnShow)
      return (props.data.reverse());

    return (props.data.slice(-maxColumnShow+1).reverse())
  }

  return (
    <div className="w-full h-full overflow-x-auto">
      <table className="w-full text-sm text-center text-black">
          <thead className="text-xs text-black uppercase bg-gray-500">
              <tr>
                  <th scope="col" className="px-6 py-3">
                      Id
                  </th>
                  <th scope="col" className="px-6 py-3">
                      Velocity 1
                  </th>
                  <th scope="col" className="px-6 py-3">
                      Velocity 2
                  </th>
              </tr>
          </thead>

          <tbody className='h-8 overflow-y-auto'>
            {
              getShowingData().map((item) => (<ShowingDataItem data={item}/>))
            }    
          </tbody>
            
          <tfoot className={(props.data.length > maxColumnShow) ? '' : 'hidden'}>
            <tr className="font-medium text-gray-600 border-b">
                <th scope="col" className="px-6 py-3">
                  {'...'}
                </th>
                <th scope="col" className="px-6 py-3">
                  {'...'}
                </th>
                <th scope="col" className="px-6 py-3">
                  {'...'}
                </th>
              </tr>
          </tfoot>
      </table>
    </div>
  )
}

export const ShowingDataItem = (props: { data: VelocitiesDataItem }) => {
  return (
    <tr className="border-b">
        <th scope="row" className="px-6 py-4 font-medium">
          {props.data.id}
        </th>
        <td className="px-6 py-4">
          {props.data.terminal_velocities[0].toFixed(4) + ' m/s'}
        </td>
        <td className="px-6 py-4">
          {props.data.terminal_velocities[1].toFixed(4) + ' m/s'}
        </td>
    </tr>   
  )
}