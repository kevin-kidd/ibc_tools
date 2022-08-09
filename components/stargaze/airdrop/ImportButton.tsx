import {Fragment, FunctionComponent, useEffect} from "react";
import {Recipient, StateProps} from "../../../types/airdropTypes";
import {Menu, Transition} from "@headlessui/react";
import {ChevronDownIcon} from "@heroicons/react/solid";
import {useFilePicker} from "use-file-picker";
import Papa from "papaparse";
import {read, utils} from "xlsx";

const ImportButton: FunctionComponent<StateProps> = ({ state, setState }) => {

    const [openXLSXSelector, xlsxFile] = useFilePicker({
        multiple: false,
        readAs: 'ArrayBuffer',
        accept: '.xlsx',
        limitFilesConfig: { max: 1 }
    });

    const [openCSVSelector, csvFile] = useFilePicker({
        multiple: false,
        readAs: 'Text',
        accept: '.csv',
        limitFilesConfig: { max: 1 }
    });

    useEffect(() => {

        const validateList = (airdropList: Recipient[], airdropType: string) => {
            if(airdropList.length === 0) {
                setState({ alertMsg: `Your airdrop list does not include any entries.`, alertSeverity: "error" });
                return false;
            }
            const indexOfEmptyAddress = airdropList.findIndex((recipient: Recipient) => recipient.address === undefined || recipient.address.length === 0);
            if(indexOfEmptyAddress !== -1) {
                setState({
                    alertMsg: `An address is missing from your airdrop list. Check line #${indexOfEmptyAddress}.`,
                    alertSeverity: "error"
                });
                return false;
            }
            if(airdropType === "mint_for") {
                const indexOfEmptyToken = airdropList.findIndex((recipient: Recipient) => recipient.token_id === undefined);
                if(indexOfEmptyToken !== -1) {
                    setState({
                        alertMsg: `A token ID is missing from your airdrop list. Check line #${indexOfEmptyToken}. If you want to airdrop random tokens, please omit the address column from your sheet.`,
                        alertSeverity: "error"
                    })
                    return false;
                }
            }

            return true;
        }

        const getIndexOfAddress = (list: any) => {
            try {
                let index;
                if(list[0][0] === "address" && list[0][1] === "token_id") index = 0;
                else if(list[0][1] === "address" && list[0][0] === "token_id") index = 1;
                else if(list[0][0] === "address") index = 3;
                setState({ indexOfAddress: index })
                return index;
            } catch (e) {
                console.error(e);
                return -1;
            }
        }

        const getUniqueAddresses = (airdropList: Recipient[]) => {
            let unique: String[] = []
            airdropList.forEach((item: Recipient) => {
                let i = unique.findIndex(x => (x === item.address));
                if (i <= -1) {
                    unique.push(item.address);
                }
                return null;
            });
            return unique.length;
        }

        const handleCSV = (csvData: String) => {
            try {
                // @ts-ignore
                Papa.parse(csvData, {
                    complete: function(results: any) {
                        const indexOfAddress = getIndexOfAddress(results.data);
                        if(indexOfAddress === -1) {
                            setState({
                                alertMsg: "Unable to find the 'address' column. Please make sure you have the same structure as the template file.",
                                alertSeverity: "error"
                            });
                            return;
                        }
                        let airdropType: string;
                        if(indexOfAddress === 3) airdropType = "mint_to"
                        else airdropType = "mint_for";
                        setState({ airdropType: airdropType });
                        results.data.shift();
                        let airdropList: Recipient[] = [];
                        results.data.forEach((element: any) => {
                            if(indexOfAddress === 1) {
                                airdropList.push({
                                    token_id: element[0],
                                    address: element[1]
                                })
                            } else {
                                airdropList.push({
                                    token_id: element[1],
                                    address: element[0]
                                })
                            }
                        });
                        if(!validateList(airdropList, airdropType)) return;
                        const uniqueAmount = getUniqueAddresses(airdropList);
                        setState({ airdropList: airdropList, currentStep: 2, uniqueAmount: uniqueAmount });
                    }}
                )
            } catch (e) {
                setState({ alertMsg: `Format mismatch. Please confirm that your airdrop file has the same structure as the template.`, alertSeverity: "error" });
                console.error(e)
            }
        }

        const handleXLSX = (xlsxData: ArrayBuffer) => {
            try {
                const data = new Uint8Array(xlsxData);
                const workbook = read(data, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const airdropList: Recipient[] = utils.sheet_to_json(worksheet);
                const indexOfAddress = getIndexOfAddress(airdropList);
                if(indexOfAddress === -1) {
                    setState({
                        alertMsg: "Unable to find the 'address' column. Please make sure you have the same structure as the template file.",
                        alertSeverity: "error"
                    });
                    return;
                }
                let airdropType: string;
                if(indexOfAddress === 3) airdropType = "mint_to"
                else airdropType = "mint_for";
                setState({ airdropType: airdropType });
                if(!validateList(airdropList, airdropType)) return;

                const uniqueAmount = getUniqueAddresses(airdropList);
                setState({ airdropList: airdropList, currentStep: 2, uniqueAmount: uniqueAmount });
            } catch (e) {
                setState({ alertMsg: `Format mismatch. Please confirm that your airdrop file has the same structure as the template.`, alertSeverity: "error" });
                console.error(e)
            }
        }

        try {
            if (csvFile.filesContent.length > 0) {
                const file = csvFile.filesContent[0]
                if (file.hasOwnProperty('name')) {
                    // @ts-ignore
                    const content: String = file.content;
                    if (file.name.includes(".csv")) handleCSV(content);
                    else setState({alertMsg: `File type is not supported.`, alertSeverity: "error"});
                }
            } else if (xlsxFile.filesContent.length > 0) {
                const file = xlsxFile.filesContent[0]
                if(file.hasOwnProperty('name')) {
                    // @ts-ignore
                    const content: ArrayBuffer = file.content;
                    if(file.name.includes(".xlsx")) handleXLSX(content);
                    else setState({ alertMsg: `File type is not supported.`, alertSeverity: "error" });
                }
            }
            window.scroll({
                top: document.body.offsetHeight,
                left: 0,
                behavior: 'smooth',
            });
        } catch (e) {
            console.error(e)
        }
    }, [csvFile.filesContent, xlsxFile.filesContent, setState])

    return(
        <Menu as="div" className="relative inline-block text-left z-20">
            <div>
                <Menu.Button className="inline-flex justify-center w-full focus:outline-none
                font-extrabold inline-flex
                         border-[#1d1d1d] border button-dropshadow transition duration-200
                         text-md bg-[#fff985] px-4 py-1 mr-2 focus:outline-none

                ">
                    <ChevronDownIcon className="-ml-1 mr-2 mt-0.5 h-5 w-5" aria-hidden="true" />
                    Import
                </Menu.Button>
            </div>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="origin-top-right absolute right-0 mt-1 w-full shadow-lg bg-white ring-1 border border-black ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
                    <div className="py-1">
                        <Menu.Item>
                            <a className="group flex items-center px-4 py-2 text-sm hover:text-[#85ff89] hover:cursor-pointer" onClick={() => openXLSXSelector()}>
                                XLSX
                            </a>
                        </Menu.Item>
                    </div>
                    <div className="py-1">
                        <Menu.Item>
                            <a className='group flex items-center px-4 py-2 text-sm  hover:text-[#85ff89] hover:cursor-pointer' onClick={() => openCSVSelector()}>
                                CSV
                            </a>
                        </Menu.Item>
                    </div>
                    {/*<div className="py-1">*/}
                    {/*    <Menu.Item>*/}
                    {/*        <a className='group flex items-center px-4 py-2 text-sm  hover:text-[#85ff89] hover:cursor-pointer'  onClick={() => openFileSelector()}>*/}
                    {/*            JSON*/}
                    {/*        </a>*/}
                    {/*    </Menu.Item>*/}
                    {/*</div>*/}
                </Menu.Items>
            </Transition>
        </Menu>
    )
}

export default ImportButton;