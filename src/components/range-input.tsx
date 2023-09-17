import React from 'react';

export interface RangeInputProps {
  name: string;
  minValue: number;
  maxValue: number;
  step: number;
  input: number;
  unit?: string
  setInput: (value: number) => void
}

export const RangeInput = (props: RangeInputProps) => {

  return (
    <div>
      <label 
        className="block text-xl font-medium text-gray-900"
      >
        {props.name + ': ' + props.input + ' ' + (props.unit ? props.unit : '')}
      </label>
      <input 
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
        type="range" 
        min={props.minValue}
        max={props.maxValue}
        value={props.input}
        step={props.step}
        onChange={(e) => {
          props.setInput(parseFloat(e.target.value));
        }}
      />
    </div>
  )
}