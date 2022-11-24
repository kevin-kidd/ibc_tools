import type { FunctionComponent } from "react";
import type { StateProps } from "../../../types/airdrop";
import ImportButton from "./ImportButton";
import Link from "next/link";
import Image from "next/image";

const ImportCard: FunctionComponent<StateProps> = ({ state, setState }) => {
  return (
    <div className="main-card">
      <Image
        className="border border-[#f3eee9] h-60 object-cover w-full"
        src="/background.svg"
        width={800}
        height={400}
        alt="IBC NFTs"
      />
      <div className="grid xl:grid-cols-4 mb-4 ml-10 mt-10">
        <ul className="col-span-3 list-disc">
          <li>
            Fill out one of our{" "}
            <a
              target="_blank"
              rel="noreferrer"
              className="hover:text-lightgreen text-black transition duration-150 font-bold"
              href="https://kevin-k.gitbook.io/ibc-nfts-tools/guides/airdrop-nfts-on-stargaze#import-your-airdrop-list"
            >
              airdrop templates
            </a>
            .
          </li>
          <li>Import your airdrop list and continue to step 2.</li>
        </ul>
        <div className="col-span-1 mt-4 xl:mt-0 flex items-center">
          <ImportButton state={state} setState={setState} />
        </div>
      </div>
      <div className="flex justify-between items-end mt-8">
        <p className="text-[#686765] text-sm ml-2 mb-2">
          Note: Exported files from the
          <Link href="/stargaze/snapshot" target="_blank">
            <span className="hover:text-lightgreen text-black transition duration-150 font-bold">
              snapshot tool
            </span>
          </Link>
          are compatible.
        </p>
        <p className="text-[#686765] text-lg mb-2 mr-2">Step 1</p>
      </div>
    </div>
  );
};

export default ImportCard;
