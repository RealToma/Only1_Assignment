import React from "react";
import { useMediaQuery } from "react-responsive";
import { Transition } from "@headlessui/react";

const Modal = ({ children, onClose }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });

  return (
    <Transition.Root show={true} as={React.Fragment}>
      <div
        className={`fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center ${
          isMobile ? "" : "p-4"
        }`}
      >
        <Transition.Child
          as={React.Fragment}
          enter="transition-opacity duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className={`bg-white rounded-xl shadow-xl ${
              isMobile ? "w-full h-full" : "w-auto"
            }`}
          >
            {isMobile && (
              <button className="absolute top-0 left-0 p-4" onClick={onClose}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-6 h-6 text-gray-600"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.414 10l4.293-4.293a1 1 0 00-1.414-1.414L10 8.586 5.707 4.293a1 1 0 00-1.414 1.414L8.586 10l-4.293 4.293a1 1 0 101.414 1.414L10 11.414l4.293 4.293a1 1 0 001.414-1.414L11.414 10z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            )}
            {children}
          </div>
        </Transition.Child>
      </div>
    </Transition.Root>
  );
};

export default Modal;
