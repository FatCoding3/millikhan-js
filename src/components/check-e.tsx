import { useEffect, useState } from "react"

export const CheckE = (props: {charges: number[]}) => {

  const [right, setRight] = useState(false);
  const [checked, setChecked] = useState(false);
  const [predictE, setPredictE] = useState('');

  useEffect(() => {
    setChecked(false)
  }, [props.charges.length])

  return (
    <div className="w-full h-full flex flex-col justify-center gap-5">
      <div className="text-2xl text-blue-600">Check electron charges</div>
      <div className="w-full flex gap-5">
        <input 
          type="number" 
          value={predictE}
          onChange={(e) => {
            setPredictE(e.target.value)
            setChecked(false);
          }}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-[50px]"
        ></input>
        <button 
          onClick={() => {
            setChecked(true);
            setRight(checkECharge(props.charges, parseFloat(predictE), 0.1e-3));
          }}
          className={
            "w-[140px] h-[50px] bg-blue-600 text-white rounded-xl font-bold text-md hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 "
            + (checked ? 'hidden' : '')
          }
        >Check</button>
        <button
          disabled={true}
          className={
            "w-[140px] h-[50px] bg-green-600 text-white rounded-xl font-bold text-md "
            + (checked && right ? '' : 'hidden')
          }
        >Correct</button>
        <button 
          disabled={true}
          className={
            "w-[140px] h-[50px] bg-red-600 text-white rounded-xl font-bold text-md "
            + (checked && !right ? '' : 'hidden')
          }
        >Incorrect</button>
      </div>

      <div className={'text-sm text-red-500 h-[20px]'}>
          {checked && !right ? 'Note: maybe your value has been so near already, you can try to modify your value a little!' : ''}
        </div>
    </div>
  )
}

export const checkECharge = (charges: number[], predictE: number, acceptable: number) => {
  for (const charge of charges) {
    const approxE = charge/Math.round(charge/predictE);
    console.log(charge/predictE)
    if (Math.abs(predictE - approxE) > acceptable*predictE) return false;
  }
  return true;
}