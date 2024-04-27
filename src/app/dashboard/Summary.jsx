import React from 'react'
import ActionPanel from "./ActionPanel";
import CPDChart from './Chart';


const Summary = () => {
  return (
    <div>
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold">CPD Summary</h1>
        <div className="flex flex-col">
          <div className="flex flex-col mb-10">
            <CPDChart />
          </div>
          <div className=" ">
            <h1 className="text-3xl font-bold">My Activities</h1>
            <div className='mt-10'>
              <ActionPanel />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Summary