import Image from "next/image";
import type { FunctionComponent } from "react";
import { useMemo } from "react";
import { classNames } from "../../func/bot/helper";
import type { QuestData } from "../../pages/assetmantle/claim";

export const Quests: FunctionComponent<{ questsData: QuestData[] }> = ({
  questsData,
}) => {
  const allComplete: boolean = useMemo(
    () =>
      !questsData.some((questData: QuestData) => questData.complete === false),
    [questsData]
  );

  return (
    <div className="my-6 flex flex-col gap-y-6 px-6">
      {questsData.map((questData: QuestData) => (
        <div
          className="w-full h-full relative px-6"
          key={`quest-item-${questData.name}`}
        >
          <div className="flex flex-row w-full border-2 border-gray-200">
            <div className="h-10 w-10 bg-lightblue border-1 border-gray-200">
              <Image
                src="/icons/money-bag.webp"
                width={70}
                height={89}
                className="p-1 h-full w-auto mx-auto"
                alt="Q"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
