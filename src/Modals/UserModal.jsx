import { Dialog, Tab, Transition } from "@headlessui/react";
import { Fragment } from "react";

const UsersModal = ({
  isUOpen,
  closeUsersModal,
  isUsersModalOpen,
  followers,
  following,
}) => {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  let categories = {
    Followers: followers,
    Following: following,
  };
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
                  <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                    {Object.keys(categories).map((category) => (
                      <Tab
                        key={category}
                        className={({ selected }) =>
                          classNames(
                            "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
                            "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                            selected
                              ? "bg-white shadow"
                              : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                          )
                        }
                      >
                        {category}
                      </Tab>
                    ))}
                  </Tab.List>
                  <Tab.Panels className="mt-2">
                    {Object.values(categories).map((catNumber) => (
                      <Tab.Panel
                        key={idx}
                        className={classNames(
                          "rounded-xl bg-white p-3",
                          "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
                        )}
                      >
                        <ul>
                          {posts.map((post) => (
                            <li
                              key={post.id}
                              className="relative rounded-md p-3 hover:bg-gray-100"
                            >
                              <h3 className="text-sm font-medium leading-5">
                                {post.title}
                              </h3>

                              <ul className="mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500">
                                <li>{post.date}</li>
                                <li>&middot;</li>
                                <li>{post.commentCount} comments</li>
                                <li>&middot;</li>
                                <li>{post.shareCount} shares</li>
                              </ul>

                              <a
                                href="#"
                                className={classNames(
                                  "absolute inset-0 rounded-md",
                                  "ring-blue-400 focus:z-10 focus:outline-none focus:ring-2"
                                )}
                              />
                            </li>
                          ))}
                        </ul>
                      </Tab.Panel>
                    ))}
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
