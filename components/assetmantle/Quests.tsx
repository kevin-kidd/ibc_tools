import Image from "next/image";
import type { FunctionComponent } from "react";
import { classNames } from "../../func/bot/helper";
import type { QuestData } from "../../pages/assetmantle/claim";

export const Quests: FunctionComponent<{ questsData: QuestData[] }> = ({
  questsData,
}) => {
  return (
    <div className="my-6 flex flex-col gap-y-10 w-full sm:px-6">
      {questsData.map((questData: QuestData) => (
        <div
          className="w-full h-full relative px-6"
          key={`quest-item-${questData.name}`}
        >
          <div className="flex flex-row gap-x-4 sm:gap-x-8 w-full border-2 border-gray-200 px-2 sm:px-6">
            <div
              className={classNames(
                "h-10 w-10 aspect-square border border-gray-200 my-auto",
                questData.completed
                  ? "bg-lightgreen"
                  : questData.started
                  ? "bg-lightpink"
                  : "bg-lightblue"
              )}
            >
              <Image
                src={
                  questData.completed
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
              <h3 className="sm:text-lg">{questData.title}</h3>
              <p className="text-xs sm:text-sm">{questData.description}</p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="border border-black bg-lightblue px-4 py-2 text-black h-fit text-sm sm:text-base">
                Start
              </button>
              <button className="border border-black bg-lightgreen px-4 py-2 text-black h-fit text-sm sm:text-base">
                Claim
              </button>
            </div>
          </div>
          <div className="z-10 flex flex-col px-2 py-1 bg-lightyellow border border-1 border-gray-200 absolute -bottom-9 sm:-bottom-6 right-2">
            <span className="text-xs">Reward:</span>
            <span className="text-sm font-bold text-center px-4">
              {questData.reward.amount} {questData.reward.name}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
