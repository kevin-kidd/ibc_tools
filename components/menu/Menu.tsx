import { FunctionComponent } from "react";
import { Disclosure } from '@headlessui/react'
import Dropdown from './Dropdown'
import { MenuIcon, XIcon } from '@heroicons/react/outline'

const exploreDropdownItems = [
    { title: "All", link: "https://www.ibcnfts.com/ibc-nfts-explore", disabled: false },
    { title: "AssetMantle 🪐", link: "https://www.ibcnfts.com/ibc-networks/assetmantle", disabled: false },
    { title: "Evmos ☄️", link: "https://www.ibcnfts.com/ibc-networks/evmos", disabled: false },
    { title: "Cosmos Network ⚛️", link: "https://www.ibcnfts.com/ibc-networks/cosmos-network", disabled: false },
    { title: "OmniFlix 🖍️", link: "https://www.ibcnfts.com/ibc-networks/omniflix-network", disabled: false },
    { title: "Secret Network 🤫", link: "https://www.ibcnfts.com/ibc-networks/secret-network", disabled: false },
    { title: "Stargaze ⭐", link: "https://www.ibcnfts.com/ibc-networks/stargaze", disabled: false },
    { title: "Terra 🌎", link: "https://www.ibcnfts.com/ibc-networks/terra", disabled: false },
]

const toolsDropdownItems = [
    { title: "IBC Bot", link: "/ibc-bot", disabled: false },
    { title: "Stargaze Snapshot", link: "/stargaze-snapshot", disabled: false },
    { title: "Secret NFT Suite", link: "#", disabled: true },
    { title: "Stargaze Airdrop", link: "#", disabled: true }
]

const menuItems = [
    { title: "Calendar 📅", link: "https://www.ibcnfts.com/ibc-nfts-calendar" },
    { title: "Validators ⚙️", link: "https://www.ibcnfts.com/nft-validators" },
    { title: "Drops 🎁", link: "https://www.ibcnfts.com/nft-raffles-crypto-giveaways-stakedrops" },
    { title: "Apply 📄", link: "https://patrik768772.typeform.com/IBCNFTs" },
    { title: "DM 💬", link: "https://twitter.com/messages/compose?recipient_id=1482410071535591427" },
]

const Menu: FunctionComponent = () => {
    return(
        <Disclosure as="nav" className="bg-white shadow-[1px_1px_13px_0_rgb(0,0,0,0.3)] relative">
            {({ open }) => (
                <>
                    <div className="max-w-10xl mx-auto px-2 sm:px-4 lg:px-8">
                        <div className="container mx-auto">
                            <div className="flex justify-between h-17">
                                <div className="flex px-2 lg:px-0 basis-1/4">
                                    <div className="flex-shrink-0 flex items-center lg:ml-28">
                                        <img
                                            className="block h-12 w-auto"
                                            src="/logo.png"
                                            alt="IBCNFTs"
                                        />
                                    </div>
                                </div>
                                <div className="flex px-2 lg:px-0 basis-3/4">
                                    <div className="hidden lg:flex lg:space-x-10">
                                        <Dropdown mainTitle={"Tools"} items={toolsDropdownItems} mobile={false} />
                                        <Dropdown mainTitle={"Explore"} items={exploreDropdownItems} mobile={false} />
                                        {
                                            menuItems.map((item) => {
                                                return (
                                                    <a
                                                        key={item.title}
                                                        href={item.link}
                                                        className="whitespace-nowrap text-[#1d1d1d] hover:text-[#85ff89] inline-flex items-center px-1 pt-1 text-md font-normal"
                                                    >
                                                        { item.title }
                                                    </a>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                                <div className="flex items-center lg:hidden">
                                    {/* Mobile menu button */}
                                    <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                        <span className="sr-only">Open main menu</span>
                                        {open ? (
                                            <XIcon className="block h-6 w-6" aria-hidden="true" />
                                        ) : (
                                            <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                                        )}
                                    </Disclosure.Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Disclosure.Panel className="lg:hidden">
                        <div className="pt-2" style={{borderTop: '1px solid #000'}}>
                            <Dropdown mainTitle={"Tools"} items={toolsDropdownItems} mobile={true} />
                            <Dropdown mainTitle={"Explore"} items={exploreDropdownItems} mobile={true} />
                            {
                                menuItems.map((item) => {
                                    return (
                                        <div className="py-5 hover:cursor-pointer group menu-item" key={item.title}>
                                            <a
                                                href={item.link}
                                                className="ml-5 group-hover:text-[#85ff89] text-[#1d1d1d] inline-flex items-center px-1 pt-1 text-md font-normal">
                                                {item.title}
                                            </a>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}

export default Menu