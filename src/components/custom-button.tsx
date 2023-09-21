import React, { Children } from 'react';

export interface CustomButtonProps {
  onchange: () => void,
  children?: React.ReactNode,
}

export const CustomButton = (props: CustomButtonProps) => {
  return (
  <button 
    className="w-[140px] h-[50px] bg-blue-600 text-white rounded-full font-bold text-md hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
    onClick={() => props.onchange()}
  >
    {props.children}
  </button>
  )
}