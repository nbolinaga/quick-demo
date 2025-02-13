import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import { timeFormat } from "d3-time-format";
import { Legend, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface ChartData {
  date: string;
  close_price_PAXGUSD: number;
  return_PAXGUSD: number;
  signal_PAXGUSD: number;
  position_PAXGUSD: number;
  signal_return_PAXGUSD: number;
  signal_basket_return: number;
  cum_signal_basket_return: number;
  cum_return_PAXGUSD: number;
  cum_signal_return_PAXGUSD: number;
}

const Chart: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<ChartData[]>();

  const loadData = async () => {
    try {
      const rawData = await d3.csv("/paxg.csv", d => ({
        date: d.date!,
        close_price_PAXGUSD: +d.close_price_PAXGUSD!,
        return_PAXGUSD: +d.return_PAXGUSD!,
        signal_PAXGUSD: +d.signal_PAXGUSD!,
        position_PAXGUSD: +d.position_PAXGUSD!,
        signal_return_PAXGUSD: +d.signal_return_PAXGUSD!,
        signal_basket_return: +d.signal_basket_return!,
        cum_signal_basket_return: +d.cum_signal_basket_return!,
        cum_return_PAXGUSD: +d.cum_return_PAXGUSD!,
        cum_signal_return_PAXGUSD: +d.cum_signal_return_PAXGUSD!,
      }));

      const filteredData: ChartData[] = rawData.filter((_, index) => index % 10 === 0);
      setData(filteredData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching CSV data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const formatDate = (date: string) => {
    const parsedDate = new Date(date);
    return timeFormat("%b '%y")(parsedDate);
  };

  if (loading) {
    return <p className="text-center w-full text-3xl">Loading...</p>;
  }

  return (
    <ResponsiveContainer width="100%" height="100%" className="pr-[40px]">
      <LineChart data={data}>
        <XAxis dataKey="date" tickFormatter={formatDate} stroke="#ffffff" tick={{ fontSize: 12 }} interval={30} />
        <YAxis yAxisId="left" stroke="#ffffff" />
        <Legend
          wrapperStyle={{ color: "#ffffff", fontSize: "20px" }}
          formatter={value => <span style={{ color: value === "Momentum PAXG" ? "#c1ea60" : "#ffffff" }}>{value}</span>}
        />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="cum_return_PAXGUSD"
          name="Momentum PAXG"
          stroke="#c1ea60"
          strokeWidth={2}
          dot={false}
        />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="cum_signal_return_PAXGUSD"
          name="PAXG"
          stroke="#ffffff"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;
