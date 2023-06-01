import { Dialog, Tab, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import UserFollow from "../components/LeftSide/UserFollow";

const UsersModal = ({
  isUOpen,
  closeUsersModal,
  isUsersModalOpen,
  followers,
  following,
  currentUserData,
  activeTab,
  setActiveTab,
}) => {
  const tabs = [
    { id: 1, data: followers, name: "Followers" },
    { id: 2, data: following, name: "Following" },
  ];

  return (
    <Transition appear show={isUsersModalOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeUsersModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
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
                <Tab.Group>
                  <Tab.List className="grid grid-cols-2 gap-2">
                    {tabs.map((tab) => {
                      return (
                        <Tab
                          key={tab.id}
                          className={`py-2 rounded-md hover:bg-gray-300 transition-colors duration-300 ${
                            activeTab == tab.name
                              ? "bg-accentColor text-white"
                              : "bg-gray-200 text-textColor"
                          }`}
                          onClick={() => {
                            setActiveTab(tab.name);
                          }}
                        >
                          {tab.name}
                        </Tab>
                      );
                    })}
                  </Tab.List>
                  <Tab.Panels className="mt-8">
                    {tabs.map((tab) => {
                      return (
                        <Tab.Panel key={tab.id} className="flex flex-col gap-4">
                          {tab.data.map((user) => {
                            return (
                              <UserFollow
                                user={user}
                                currentUserData={currentUserData}
                                key={user.id}
                              />
                            );
                          })}
                        </Tab.Panel>
                      );
                    })}
                  </Tab.Panels>
                </Tab.Group>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default UsersModal;
