import React from "react";
import Image from "next/image";
import Link from "next/link";
import { hardhat } from "viem/chains";
import { CurrencyDollarIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { HeartIcon } from "@heroicons/react/24/outline";
import { SwitchTheme } from "~~/components/SwitchTheme";
import { BuidlGuidlLogo } from "~~/components/assets/BuidlGuidlLogo";
import { Faucet } from "~~/components/scaffold-eth";
import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";
import { useGlobalState } from "~~/services/store/store";

/**
 * Site footer
 */
export const Footer = () => {
  const nativeCurrencyPrice = useGlobalState(state => state.nativeCurrency.price);
  const { targetNetwork } = useTargetNetwork();
  const isLocalNetwork = targetNetwork.id === hardhat.id;

  return (
    <div className="min-h-0 py-5 px-1 mb-11 lg:mb-0">
      <div>
        <div className="fixed flex justify-between items-center w-full z-10 p-4 bottom-0 left-0 pointer-events-none">
          <div className="flex flex-col md:flex-row gap-2 pointer-events-auto">
            {nativeCurrencyPrice > 0 && (
              <div>
                <div className="btn btn-secondary bg-[#c1ea60] btn-sm font-normal gap-1 cursor-auto border-none">
                  <CurrencyDollarIcon className="h-4 w-4" />
                  <span>{nativeCurrencyPrice.toFixed(2)}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mt-10 h-fit items-center rounded-lg bg-dark px-10 md:py-6 md:mb-0 md:mt-0 md:grid md:grid-cols-3">
        <div className="col-span-1 flex items-center justify-center space-x-5 text-white md:justify-start">
          <a href="https://t.me/+MOdhyvB63StmMmE0" target="_blank">
            <Image src="/telegram-white.png" width={50} height={100} alt="image" className="h-6 w-6" />
          </a>

          <p>|</p>
          <a href="https://x.com/HODLlikeaPro" target="_blank">
            <Image src="/x.png" width={50} height={100} alt="image" className="h-5 w-5" />
          </a>
        </div>
        <div className="col-span-1 my-5 flex h-full w-auto items-center justify-center px-20 md:my-0">
          <Image src="/HODL.png" width={500} height={1000} alt="image" className="h-auto w-full md:h-10 md:w-auto" />
        </div>

        <p className="col-span-1 text-center text-grey md:text-right">HODL Protocol @ 2025. All Rights Reserved</p>
      </div>
    </div>
  );
};
