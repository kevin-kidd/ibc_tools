import type { FunctionComponent } from "react";
import { Fragment } from "react";
import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { Menu, Transition } from "@headlessui/react";

interface Item {
  title: string;
  link: string;
  disabled: boolean;
}

interface Dropdown {
  mainTitle: string;
  items: Item[];
  mobile: boolean;
}

const Dropdown: FunctionComponent<Dropdown> = ({
  mainTitle,
  items,
  mobile,
}) => {
  const [open, setOpen] = useState(false);

  if (mobile) {
    return (
      <>
        <div
          className="py-5 group hover:cursor-pointer flex justify-between  menu-item"
          onClick={() => setOpen(!open)}
        >
          <a
            href="#"
            className="ml-5 group-hover:text-lightgreen text-[#1d1d1d] items-center px-1 pt-1 text-md font-normal"
          >
            {mainTitle}
          </a>
          <ChevronDownIcon className="h-6 w-6 mr-5" aria-hidden="true" />
        </div>
        {open ? (
          <div className="bg-[#f3f3f3]">
            {items.map((item) => {
              return (
                <div
                  className="py-2 group hover:cursor-pointer menu-item"
                  key={item.title}
                >
                  {item.disabled ? (
                    <>
                      <a className="ml-5 text-[#64748b] inline-flex items-center px-1 pt-1 text-md font-normal">
                        {item.title}
                      </a>
                      <a
                        key={`disabled-${item.title}`}
                        className="ml-10 text-lightgreen inline-flex items-center px-1 text-md font-normal"
                      >
                        Coming Soon!
                      </a>
                    </>
                  ) : (
                    <a
                      href={item.link}
                      className="ml-5 group-hover:text-lightgreen text-[#1d1d1d] inline-flex items-center px-1 pt-1 text-md font-normal"
                    >
                      {item.title}
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <></>
        )}
      </>
    );
  }

  return (
    <>
      <Menu
        as="div"
        className="relative z-50 inline-flex"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <Menu.Button className="text-[#1d1d1d] hover:text-lightgreen inline-flex items-center px-1 pt-1 text-md font-normal group">
          {mainTitle}
          <ChevronDownIcon
            className="-mr-1 !text-black ml-2 h-5 w-5 transition duration-500 ease-in-out transform group-hover:rotate-180"
            aria-hidden="true"
          />
        </Menu.Button>
        <Transition
          show={open}
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-x-95"
          enterTo="transform opacity-100 scale-x-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-x-100"
          leaveTo="transform opacity-0 scale-x-95"
        >
          <div className="absolute top-17 w-48 bg-[#fff] focus:outline-none flex flex-col dropdown-shadow -ml-8 hover:cursor-pointer">
            {items.map((item) => {
              return (
                <div className="py-5 group menu-item" key={item.title}>
                  {item.disabled ? (
                    <>
                      <a className="ml-5 text-[#64748b] inline-flex items-center px-1 pt-1 text-md font-normal">
                        {item.title}
                      </a>
                      <a
                        key={`disabled-${item.title}`}
                        className="ml-10 text-lightgreen inline-flex items-center px-1 text-md font-normal"
                      >
                        Coming Soon!
                      </a>
                    </>
                  ) : (
                    <a
                      href={item.link}
                      key={item.title}
                      className="ml-5 group-hover:text-lightgreen text-[#1d1d1d] inline-flex items-center px-1 pt-1 text-md font-normal"
                    >
                      {item.title}
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        </Transition>
      </Menu>
    </>
  );
};

export default Dropdown;
