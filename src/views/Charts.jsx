import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { bitcoinService } from "../services/bitcoin.service";
import { BtcToUsd } from "../cmps/BtcUsdChart";
import { BlockSizeChart, BlockSizeData } from "../cmps/BlockSizeChart";

export function Charts() {
  const [avgBlockSizeData, setAvgBlockSizeData] = useState(null);
  const [avgBtcToUsd, setAvgBtcToUsd] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const blockSizeData = await bitcoinService.getAvgBlockSize();
      setAvgBlockSizeData(blockSizeData);
      const btcToUsd = await bitcoinService.getAvgBtcToUsd();
      setAvgBtcToUsd(btcToUsd);
    }
    fetchData();
  }, []);

  if (!avgBlockSizeData) return <img className="loader" src={require('../assets/imgs/loader.gif')} alt="" />;
  return (
    <section className="charts-section">
      <h1>Charts</h1>
      <div className="charts">
        <BlockSizeChart data={avgBlockSizeData}></BlockSizeChart>
        <BtcToUsd data={avgBtcToUsd}></BtcToUsd>
      </div>
    </section>
  );
}