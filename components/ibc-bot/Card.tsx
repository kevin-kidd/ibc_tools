import type { FunctionComponent } from "react";
import Form from "./Form";
import SelectNetwork from "./SelectNetwork";
import type { StateProps } from "../../types/bot";
import Image from "next/image";

const Card: FunctionComponent<StateProps> = (props) => {
  return (
    <div
      className="
            max-w-7xl mx-auto main-card
            lg:w-[50%] md:w-[60%] sm:w-3/4 w-5/6
            md:mt-20 md:mb-14 lg:mt-10 sm:mt-8 mt-20 h-full
            "
    >
      <Image
        className="border border-[#f3eee9] h-60 object-cover w-full"
        src="/background.svg"
        width={800}
        height={400}
        alt="IBC NFTs"
      />
      <div className="flex justify-center mt-10">
        {props.state.currentNetwork.id === 0 ? (
          <SelectNetwork state={props.state} setState={props.setState} />
        ) : (
          <Form state={props.state} setState={props.setState} />
        )}
      </div>
    </div>
  );
};

export default Card;
