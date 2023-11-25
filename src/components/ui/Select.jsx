import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import Label from "./Label";

export default function Select({
  selected,
  options,
  label,
  onChange,
  hasError,
  errorMessage,
}) {
  return (
    <div className="block">
      <Label>{label}</Label>
      <div className="w-full">
        <Listbox value={selected} onChange={(value) => onChange(value)}>
          <div className="relative">
            <Listbox.Button className="relative h-12 w-full cursor-default rounded-lg bg-neutral-200 dark:bg-neutral-700 dark:text-white py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-neutral-500 focus-visible:ring-2 focus-visible:ring-neutral-100 focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-300 sm:text-sm">
              <span className="block truncate">{selected?.name}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 0 24 24"
                  width="24px"
                  className="fill-black dark:fill-white"
                >
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path d="M7 10l5 5 5-5H7z" />
                </svg>
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-neutral-200 dark:bg-neutral-700 dark:text-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {options.map((option, idx) => (
                  <Listbox.Option
                    key={idx}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${active
                        ? "bg-white text-neutral-700"
                        : "text-neutral-700 dark:text-white"
                      }`
                    }
                    value={option}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${selected ? "font-medium" : "font-normal"
                            }`}
                        >
                          {option.name}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-lime-600">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height="24px"
                              viewBox="0 0 24 24"
                              width="24px"
                              className="fill-neutral-900"
                            >
                              <path d="M0 0h24v24H0V0z" fill="none" />
                              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                            </svg>
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>
      {hasError && <Label type="error">{errorMessage}</Label>}
    </div>
  );
}
