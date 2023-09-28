import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

const SearchInputModal = ({ closeSearchModal, isSearchModalOpen }) => {
  return (
    <Transition appear show={isSearchModalOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeSearchModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Quisquam vitae ipsa quod sit itaque omnis tempore. Repellendus,
                nisi? Ad voluptatem cumque explicabo iusto. Deserunt beatae quam
                officiis esse vel ex!
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default SearchInputModal;
