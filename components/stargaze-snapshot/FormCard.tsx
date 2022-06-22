import {FunctionComponent} from "react";
import {StateProps} from "../../types/snapshotTypes";
import Form from "./Form"

const FormCard: FunctionComponent<StateProps> = (props) => {

    const {state, setState} = props
    return (
        <div className="
                max-w-7xl mx-auto main-card
                lg:w-[50%] md:w-[60%] sm:w-3/4 w-5/6
                md:mt-20 md:mb-14 lg:mt-10 sm:mt-8 mt-20 h-full
                "
        >
            <div className="
                    flex justify-center relative
                ">
                <div>
                    <img className="h-3/5 border border-[#f3eee9] object-cover w-full" src="/background2.jpeg"
                         alt=""/>
                </div>
                <img className="w-1/2 absolute bottom-2 left-4 lg:w-2/5 lg:left-6 lg:bottom-10"
                     src="/IBC_NFT_Logo.png" alt="IBC Bot"/>
            </div>
            <Form state={state} setState={setState}/>
            <div className="flex flex-row justify-center mb-12 ml-2">
                <p>Note: Large collections will take a while to process.</p>
            </div>
        </div>
    )

}

export default FormCard