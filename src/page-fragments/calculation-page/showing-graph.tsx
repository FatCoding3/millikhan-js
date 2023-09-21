import { toFixed } from "../../helper/to-fixed";
import { CalculatedDataItem } from "./data-validation";
import { Scatter } from "react-chartjs-2";

export const ShowingGraph = (props: { data: CalculatedDataItem[], showDataTable: () => void }) => {
  
  const data = {
    datasets: [
      {
        label: 'Charges',
        pointRadius: 5,
        pointHoverRadius: 7,
        data: props.data.map((item) => ({
          x: parseFloat(toFixed(item.calCharges, 6)),
          y: 1
        })),
        backgroundColor: 'rgba(255, 99, 132, 1)', 
      }
    ]
  }

  const options = {
    scales: {
      x: {
        ticks: {
          callback: function(val: any, index: any, context: any) {
            return (index == 0 || index == context.length - 1) ? 
              toFixed(parseFloat(String(val)), 6) : '';
          },
        }
      },
      y: {
        ticks: {
          display: false,
          stepSize: 1
        }
      },
    },
    element: {
      point: {
        radius: 10,
        hoverRadius: 20
      }
    },
    plugins: {
      zoom: {
        zoom: {
          wheel: { enabled: true },
          pinch: { enabled: true },
          // drag: { enabled: true },
          mode: 'x' as 'x',
        },
        pan: {
          enabled: true,
          mode: 'x' as 'x',
        },
      },
      legend: {
        labels: {
          boxWidth: 0,
          displayColors: false,
          color: '#6b7280',
          weight: 'bolder',
          font: {
              size: 25
          }
        }
      },
      tooltip: {
        displayColors: false,
        callbacks: {
          label: function(context: any) {
            return context.raw.x;
          }
        }
      }
    }
  };
  
  return (
    <div className="w-full h-fit">
      <div className="w-full h-[404px] flex items-center justify-center">
        <Scatter options={options} data={data}/>
      </div>

      <div className="flex gap-6 items-center justify-center w-full h-[80px]">
      <button 
          className={
            "w-[120px] h-[40px] bg-green-600 text-white rounded-full font-bold text-sm hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 "
          }
          onClick={() => props.showDataTable()}
        >
          Show data
        </button>
      </div>
    </div>
  )
}