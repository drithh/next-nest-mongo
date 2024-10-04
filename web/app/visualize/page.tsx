'use client';

import GetGraphForm from './_form/get-graph.form';
import { Chart } from './_components/chart';
import { useState } from 'react';
import { GetAvailabilityResponseDto } from '@/generated/schemas';

export default function Visualize() {
  const [graphData, setGraphData] = useState<GetAvailabilityResponseDto[]>([]);

  return (
    <div className="min-h-screen flex h-full flex-col gap-24 justify-center max-w-2xl mx-auto font-sans">
      <h1 className="font-semibold text-6xl text-center">Visualize data</h1>
      <div className="w-full flex flex-col  justify-between ">
        <GetGraphForm setGraphData={setGraphData} />

        <Chart data={graphData} />
      </div>
    </div>
  );
}
