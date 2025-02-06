"use client";

import { useState } from "react";
import type { NextPage } from "next";
import { useTheme } from "next-themes";
import { parseEther } from "viem";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

const Home: NextPage = () => {
  const [amount, setAmount] = useState<string>("");
  const [selectedRWA, setSelectedRWA] = useState<string>("Select RWA");
  const [selectedStrategy, setSelectedStrategy] = useState<string>("Select Strategy");

  const { writeContractAsync } = useScaffoldWriteContract("YourContract");

  const handleSelectStrategy = (e: string) => {
    setSelectedStrategy(e);
    const elem = document.activeElement;
    if (elem) {
      (elem as HTMLElement)?.blur();
    }
  };

  const handleSelectRWA = (e: string) => {
    setSelectedRWA(e);
    const elem = document.activeElement;
    if (elem) {
      (elem as HTMLElement)?.blur();
    }
  };

  const handleGetStarted = () => {
    if (document) {
      (document.getElementById("my_modal_1") as HTMLDialogElement)?.showModal();
    }
  };

  const confirmPosition = async () => {
    setAmount("");
    setSelectedRWA("Select RWA");
    setSelectedStrategy("Select Strategy");
    try {
      await writeContractAsync(
        {
          functionName: "setGreeting",
          args: [amount],
          value: parseEther(amount),
        },
        {
          onBlockConfirmation: txnReceipt => {
            console.log("📦 Transaction blockHash", txnReceipt.blockHash);
          },
        },
      );
    } catch (e) {
      console.error("Error setting greeting", e);
    }
  };

  const { setTheme } = useTheme();
  setTheme("business");

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <h1 className="text-6xl mb-10 w-1/2 text-center">
          Accumulate more RWA <br />
          with no leverage
        </h1>
        <div className="bg-neutral p-10 rounded-box space-y-2">
          <div className="rounded-box border p-5">
            <label>Buy</label>
            <div className="flex justify-center items-center mt-2">
              <input
                type="text"
                placeholder={
                  selectedRWA == "Select RWA"
                    ? "Selected a rwa..."
                    : selectedStrategy == "Select Strategy"
                      ? "Selected a strategy..."
                      : "Eth amount..."
                }
                value={amount}
                onChange={
                  selectedRWA !== "Select RWA" && selectedStrategy !== "Select Strategy"
                    ? e => setAmount(e.target.value)
                    : () => console.log("test")
                }
                className="input w-full max-w-xs"
              />
              <div className="dropdown dropdown-hover">
                <div tabIndex={0} role="button" className="btn m-1">
                  {selectedRWA}
                </div>
                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                  <li>
                    <a onClick={() => handleSelectRWA("Pax Gold")}>PAX Gold</a>
                  </li>
                  <li>
                    <a onClick={() => handleSelectRWA("APF Coin")}>APF coin</a>
                  </li>
                  <li>
                    <a onClick={() => handleSelectRWA("RealToken")}>RealToken</a>
                  </li>
                  <li>
                    <a onClick={() => handleSelectRWA("Kinesis Silver")}>Kinesis Silver</a>
                  </li>
                  <li>
                    <a onClick={() => handleSelectRWA("Agridex")}>Agridex</a>
                  </li>
                  <li>
                    <a onClick={() => handleSelectRWA("Hifi Finance")}>Hifi Finance</a>
                  </li>
                </ul>
              </div>
            </div>
            <p className="text-xs text-gray-600 -mb-1">${(Number(amount) * 2827.19).toLocaleString() || 0}</p>
          </div>
          <div className="rounded-box border border-secondary p-5 bg-secondary">
            <label>Strategy</label>
            <div className="flex justify-center items-center mt-2">
              <input
                type="text"
                placeholder="amount..."
                value={(Number(amount) * (selectedStrategy == "Momentum" ? 3.14 : 2.78)).toLocaleString() + " Shares"}
                className="input w-full max-w-xs"
                disabled
              />
              <div className="dropdown dropdown-hover">
                <div tabIndex={0} role="button" className="btn m-1">
                  {selectedStrategy}
                </div>
                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                  <li>
                    <a onClick={() => handleSelectStrategy("Momentum")}>Momentum</a>
                  </li>
                  <li>
                    <a onClick={() => handleSelectStrategy("Smoothcoin")}>Smoothcoin</a>
                  </li>
                </ul>
              </div>
            </div>
            <p className="text-xs text-gray-600 -mb-1">${(Number(amount) * 2827.19).toLocaleString() || 0}</p>
          </div>
          <button
            className="btn w-full bg-primary"
            onClick={() => handleGetStarted()}
            disabled={selectedRWA == "Select RWA" || selectedStrategy == "Select Strategy" || amount == ""}
          >
            {" "}
            Get Started
          </button>
        </div>
      </div>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Confirm position?</h3>
          <p className="pt-4">
            Positon: {selectedRWA} {selectedStrategy}
          </p>
          <p>Eth Amount: {amount}</p>
          <p>USDC: ${(Number(amount) * 2827.19).toLocaleString() || 0}</p>
          <p className="pb-4">Date: {Date()}</p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn" onClick={() => confirmPosition()}>
                Confirm
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Home;
