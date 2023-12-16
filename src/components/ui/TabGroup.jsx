/* eslint-disable react/prop-types */
import { Tab } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function TabGroup({ tabs, children, setSelectedTabIndex }) {
  return (
    <div className="w-full">
      <Tab.Group onChange={setSelectedTabIndex}>
        <Tab.List className="flex space-x-1 rounded-xl bg-neutral-200 dark:bg-neutral-800 p-1">
          {tabs.map((tab) => (
            <Tab
              key={tab}
              className={({ selected }) =>
                classNames(
                  "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-neutral-500 dark:text-neutral-400",
                  "ring-white/60 dark:ring-black/60 ring-offset-2 ring-offset-neutral-900 dark:ring-offset-neutral-300 focus:outline-none focus:ring-2",
                  selected
                    ? "bg-white dark:text-white text-neutral-950 dark:bg-neutral-950 shadow"
                    : "text-neutral-600 hover:bg-white/[0.12] hover:text-white"
                )
              }
            >
              {tab}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {tabs.map((tab, idx) => (
            <Tab.Panel
              key={idx}
              className={classNames(
                "rounded-2xl border-neutral-300 dark:border-neutral-800 border p-3",
                "ring-white/60 ring-offset-2 ring-offset-neutral-400 focus:outline-none focus:ring-2"
              )}
            >
              {children}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
