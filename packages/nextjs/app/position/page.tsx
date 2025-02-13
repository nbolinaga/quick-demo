"use client";

import React from "react";
import Chart from "~~/components/Chart";

const page = () => {
  return (
    <div className="relative flex items-center flex-col flex-grow pt-10 h-screen bg-cover bg-fixed bg-center bg-[url('/stars.jpeg')] overflow-hidden ">
      <p className="text-white text-3xl">Historical PAXG closing price</p>
      <div className="mx-auto mt-20 h-[40vh] space-y-5 w-2/3">
        <Chart />
      </div>
    </div>
  );
};

export default page;
