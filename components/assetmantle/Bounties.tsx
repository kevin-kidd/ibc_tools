import Image from "next/image";
import React from "react";
import type { Dispatch, FunctionComponent } from "react";
import { classNames } from "../../utils/bot/helper";
import ky from "ky";
import Link from "next/link";
import type { Bounty, MantleClaimState } from "../../types/mantleClaim";

export const Bounties: FunctionComponent<{
  bounties: Bounty[];
  setState: Dispatch<Partial<MantleClaimState>>;
}> = ({ bounties, setState }) => {
  const handleClaim = async (bounty: Bounty) => {
    try {
      const claimResponse = await ky.post(
        "https://api.rarity.ibcnfts.com/bounties/" + bounty._id,
        {
          credentials: "include",
        }
      );
      console.log(claimResponse);
      if (claimResponse.ok) {
        setState({
          alertMsg: `Congrats! You have been rewarded ${
            parseInt(bounty.rewards[0].amount) / Math.pow(10, 6)
          }`,
          alertSeverity: "success",
        });
      }
    } catch (error) {
      setState({
        alertMsg: "You are not eligible to claim this quest.",
        alertSeverity: "error",
      });
    }
  };

  return (
    <div className="my-6 flex flex-col gap-y-10 w-full sm:px-6">
      {bounties.map((bounty: Bounty) => (
        <div
          className="w-full h-full relative px-6"
          key={`quest-item-${bounty._id}`}
        >
          <div className="flex flex-row gap-x-4 sm:gap-x-8 w-full border-2 border-gray-200 px-2 sm:px-6">
            <div
              className={classNames(
                "h-10 w-10 aspect-square border border-gray-200 my-auto",
                bounty.status === "completed"
                  ? "bg-lightgreen"
                  : bounty.status === "started"
                  ? "bg-lightpink"
                  : "bg-lightblue"
              )}
            >
              <Image
                src={
                  bounty.status === "completed"
                    ? "/icons/money-bag.webp"
                    : "/icons/swords.webp"
                }
                width={70}
                height={89}
                className="p-1 h-full w-auto mx-auto"
                alt="Q"
              />
            </div>
            <div className="w-full flex flex-col text-black py-6 max-w-xs">
              <h3 className="sm:text-lg">Test</h3>
              <p className="text-xs sm:text-sm">Test description</p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href={bounty.startUrl ?? "#"} target="_blank">
                <button className="border border-black bg-lightblue px-4 py-2 text-black h-fit text-sm sm:text-base">
                  Start
                </button>
              </Link>
              <button
                onClick={() => handleClaim(bounty)}
                className="border border-black bg-lightgreen px-4 py-2 text-black h-fit text-sm sm:text-base"
              >
                Claim
              </button>
            </div>
          </div>
          <div className="z-10 flex flex-col px-2 py-1 bg-lightyellow border border-1 border-gray-200 absolute -bottom-9 sm:-bottom-6 right-2">
            <span className="text-xs">Reward:</span>
            <span className="text-sm font-bold text-center px-4">
              {bounty.rewards[0].type === "native_bank" &&
                `${
                  parseInt(bounty.rewards[0].amount) / Math.pow(10, 6)
                } ${bounty.rewards[0].denom.slice(1).toUpperCase()}`}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
