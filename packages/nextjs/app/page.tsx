"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { RWASelectData, StrategySelectData } from "./data";
import type { NextPage } from "next";
import { useTheme } from "next-themes";
import { parseEther } from "viem";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

const Home: NextPage = () => {
  const router = useRouter();
  const date = new Date();

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
    console.log(e);
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

  const handleCloseDialog = (): void => {
    if (document) {
      (document.getElementById("my_modal_1") as HTMLDialogElement)?.close();
    }
  };

  const confirmPosition = async () => {
    try {
      await writeContractAsync(
        {
          functionName: "setRWA",
          args: [amount],
          value: parseEther(amount),
        },
        {
          onBlockConfirmation: txnReceipt => {
            console.log("📦 Transaction blockHash", txnReceipt.blockHash);
          },
        },
      ).then(() => (selectedRWA == "Pax Gold" && selectedStrategy == "Momentum" ? router.push("/position") : null));
    } catch (e) {
      console.error("Error setting greeting", e);
    }
    setAmount("");
    setSelectedRWA("Select RWA");
    setSelectedStrategy("Select Strategy");
  };

  const { setTheme } = useTheme();
  setTheme("business");

  return (
    <>
      <div className="relative flex items-center flex-col flex-grow pt-10 h-screen bg-cover bg-fixed bg-center bg-[url('/stars.jpeg')] overflow-hidden ">
        <div className="absolute left-1/2 top-full z-10 hidden h-screen w-full -translate-x-1/2 -translate-y-1/2 items-end justify-center md:flex ">
          <Image
            src={"/moon.png"}
            width={1000}
            height={1000}
            alt="photo of the earth viewed from space / black and white"
            className="h-auto w-full md:h-[100vh] md:w-auto animate-[spin_500s_linear_infinite] "
          />
        </div>
        <h1 className="text-[8vw] md:text-6xl mb-10 md:w-1/2 text-center">
          Accumulate more RWA <br />
          with no leverage
        </h1>
        <div className="relative bg-neutral/90 p-5 md:p-10 !rounded-xl md:w-1/3 z-40 mx-10 md:mx-0">
          <div className="rounded-box p-5 flex flex-col">
            <label>Make a selection:</label>
            <div className="dropdown w-full">
              {" "}
              {/** dropdown-hover */}
              <div tabIndex={0} role="button" className="btn m-1 w-full flex justify-between">
                {selectedRWA}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </div>
              <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-full p-2 shadow">
                {RWASelectData.map(item => (
                  <li key={`RWASelectData-${item.key}`}>
                    <a onClick={() => handleSelectRWA(item.value)}>{item.key}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="dropdown w-full">
              {" "}
              {/** dropdown-hover */}
              <div tabIndex={0} role="button" className="btn m-1 w-full flex justify-between">
                {selectedStrategy}{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </div>
              <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] p-2 shadow w-full">
                {StrategySelectData.map(item => (
                  <li key={`StrategySelectData-${item.key}`}>
                    <a onClick={() => handleSelectStrategy(item.value)}>{item.key}</a>
                  </li>
                ))}
              </ul>
            </div>
            <p className="underline text-secondary cursor-pointer my-2 text-center flex justify-center items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                />
              </svg>
              Learn more about our strategies.
            </p>
            <input
              type="text"
              placeholder={
                selectedRWA == "Select RWA"
                  ? "Select a rwa first"
                  : selectedStrategy == "Select Strategy"
                    ? "Select a strategy first"
                    : "Amount (ETH)..."
              }
              value={amount}
              onChange={
                selectedRWA !== "Select RWA" && selectedStrategy !== "Select Strategy"
                  ? e => setAmount(e.target.value)
                  : () => console.log("test")
              }
              className="input w-full m-1"
              disabled={selectedRWA == "Select RWA" || selectedStrategy == "Select Strategy"}
            />
          </div>
          <div className="rounded-box border border-secondary p-5 bg-secondary flex flex-col my-2">
            <label>Shares:</label>
            <input
              type="text"
              placeholder="amount..."
              value={(Number(amount) * (selectedStrategy == "Momentum" ? 3.14 : 2.78)).toLocaleString()}
              className="input w-full m-1"
              disabled
            />
            <p className="text-md text-white my-0 pt-1">${(Number(amount) * 2827.19).toLocaleString() || 0}</p>
          </div>
          <button
            className="btn w-full bg-[#c1ea60] rounded-md text-black hover:text-white"
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
          <div className="flex flex-col gap-2 mt-5">
            <div className="flex justify-between">
              <span className="font-bold underline">Position:</span>{" "}
              <span>
                {selectedRWA} / {selectedStrategy}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold underline">Eth Amount:</span> <span>{amount}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold underline">USDC:</span>{" "}
              <span>${(Number(amount) * 2827.19).toLocaleString() || 0}</span>
            </div>
            <div className="pb-4 flex justify-between">
              <span className="font-bold underline">Date:</span> <span>{date.toLocaleDateString("es-ES")}</span>
            </div>
          </div>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <div className="flex gap-4">
                <button className="btn border-white hover:bg-white hover:text-black" onClick={handleCloseDialog}>
                  Close
                </button>
                <button className="btn bg-[#c1ea60] text-black hover:bg-white" onClick={confirmPosition}>
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Home;
