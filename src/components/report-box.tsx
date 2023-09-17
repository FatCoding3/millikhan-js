export type ReportData = {[key: number]: number};

export const ReportBox = (props: {data: ReportData}) => {
  return (
    <div className="w-full h-full overflow-x-auto">
      <table className="w-full text-sm text-left text-black">
          <thead className="text-xs text-black uppercase bg-gray-500">
              <tr>
                  <th scope="col" className="px-6 py-3">
                      Oil
                  </th>
                  <th scope="col" className="px-6 py-3">
                      Number
                  </th>
              </tr>
          </thead>

          <tbody>
            <tr className="border-b">
                <th scope="row" className="px-6 py-4 font-medium text-gray-700">
                  With 0 terminal velocities
                </th>
                <td className="px-6 py-4">
                  {props.data[0]}
                </td>
            </tr>      
            <tr className="border-b">
                <th scope="row" className="px-6 py-4 font-medium text-yellow-700">
                  With 1 terminal velocities
                </th>
                <td className="px-6 py-4">
                  {props.data[1]}
                </td>
            </tr>   
            <tr className="border-b">
                <th scope="row" className="px-6 py-4 font-medium text-green-600">
                  With 2 terminal velocities
                </th>
                <td className="px-6 py-4">
                  {props.data[2]}
                </td>
            </tr>         
          </tbody>
      </table>
    </div>
  )
}