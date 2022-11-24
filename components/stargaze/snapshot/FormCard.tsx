import Image from "next/image";
import type { FunctionComponent } from "react";
import type { StateProps } from "../../../types/snapshot";
import Form from "./Form";

const FormCard: FunctionComponent<StateProps> = (props) => {
  const { state, setState } = props;

  return (
    <div
      className="max-w-7xl mx-auto main-card lg:w-[50%] md:w-[60%] sm:w-3/4 w-5/6
        md:mt-20 md:mb-14 lg:mt-10 sm:mt-8 mt-20 h-full"
    >
      <Image
        className="border border-[#f3eee9] h-60 object-cover w-full"
        src="/background.svg"
        width={800}
        height={400}
        alt="IBC NFTs"
      />
      <Form state={state} setState={setState} />
      <div className="flex flex-row justify-center mb-12 ml-2">
        <p>Note: Large collections will take a while to process.</p>
      </div>
    </div>
  );
};

export default FormCard;
