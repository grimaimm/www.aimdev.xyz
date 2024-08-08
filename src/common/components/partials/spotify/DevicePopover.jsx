import * as React from "react";
import { Popover, Transition } from "@headlessui/react";
import { BsCpu as DeviceIcon, BsDot as DotIcon } from "react-icons/bs";
import { PAIR_DEVICES } from "@/common/constant/Devices";
import AnimatedBars from "./AnimatedBars";

const DevicePopover = ({ devices, isShow }) => {
  const listDevices = devices?.map(device => ({
    ...device,
    icon: PAIR_DEVICES[device?.type]?.icon || (
      <DeviceIcon
        className="w-auto text-zinc-700 dark:text-zinc-300"
        size={24}
      />
    )
  }))

  return (
    <Transition
      as={React.Fragment}
      show={isShow}
      enter="transition ease-out duration-200"
      enterFrom="opacity-0 translate-y-1"
      enterTo="opacity-100 translate-y-0"
      leave="transition ease-in duration-150"
      leaveFrom="opacity-100 translate-y-0"
      leaveTo="opacity-0 translate-y-1"
    >
      <Popover.Panel className="absolute bottom-10 right-0 z-20 w-max">
        <div className="flex flex-col gap-5 overflow-hidden rounded-lg bg-zinc-100 px-6 py-5 shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-zinc-800 dark:text-white">
          {listDevices?.map((device, index) => (
            <div
              key={index}
              className="flex w-full items-center justify-between gap-3"
            >
              {device?.icon}
              <div className="flex flex-grow flex-col pl-0.5 pr-2">
                <span className=" font-medium">{device?.name}</span>
                <span className="text-xs font-light text-zinc-600 dark:text-zinc-400">
                  {device?.model}
                </span>
              </div>
              {device?.is_active ? (
                <AnimatedBars variant="bg-green-500" />
              ) : (
                <DotIcon
                  className="ml-2 w-auto text-zinc-600 dark:text-zinc-400"
                  size={22}
                />
              )}
            </div>
          ))}
        </div>
      </Popover.Panel>
    </Transition>
  )
}

export default DevicePopover;
