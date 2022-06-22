import { FunctionComponent } from "react";
import Form from "./Form";
import SelectNetwork from './SelectNetwork'
import { StateProps } from '../../types/botTypes'

const Card: FunctionComponent<StateProps> = (props) => {

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
                    <img className="h-3/5 border border-[#f3eee9] object-cover w-full" src="/background2.jpeg" alt=""/>
                </div>
                <img className="w-1/2 absolute bottom-2 left-4 lg:w-2/5 lg:left-6 lg:bottom-10" src="/IBC_BOT_Logo.png" alt="IBC Bot" />
            </div>
            { props.state.network.id === 0 ?
                <SelectNetwork state={props.state} setState={props.setState} />
                :
                <Form state={props.state} setState={props.setState} />
            }
        </div>
    )
}

export default Card