import React, { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import Modal from "./Modal/ModalCreatePost";
import { useMediaQuery } from "react-responsive";

const Post = ({ post, isFetchingNextPage }) => {
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
  const [flagDeletePost, setFlagDeletePost] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });

  const handleCloseModalDelete = () => {
    setModalDeleteOpen(false);
  };

  const handleModalDelete = () => {
    setModalDeleteOpen(true);
  };

  const handleDeletePost = () => {
    handleCloseModalDelete();
    setFlagDeletePost(1);

    setTimeout(() => {
      setFlagDeletePost(2);
      setTimeout(() => {
        setFlagDeletePost(0);
        window.location.reload();
      }, 1000);
    }, 2000);
  };

  return (
    <div
      key={post.userId}
      className={`p-4 border-b cursor-pointer hover:bg-gray-300 ${
        isFetchingNextPage ? "opacity-50" : ""
      } ${!isMobile ? "text-center" : "text-left"}`}
    >
      <p className="text-gray-800 mb-3">Title: {post.title}</p>
      <p className="text-gray-400 text-sm">
        {post.author} - {post.createdAt}
      </p>

      <p className="text-gray-600 text-sm">Content: {post.content}</p>
      <div className="flex justify-end mt-[30px]">
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
              Options
              <svg
                className="-mr-1 h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
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
            <Menu.Items className="absolute right-0 z-10 mt-2 w-[100px] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={
                        (active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm")
                      }
                    >
                      Archive
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={
                        (active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm")
                      }
                    >
                      Update
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={
                        (active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm")
                      }
                      onClick={() => handleModalDelete()}
                    >
                      Delete
                    </a>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
        {/* Confirmation modal */}
      </div>
      {flagDeletePost === 1 ? (
        <div className="flex items-center justify-center">
          <div className="w-6 h-6 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
          <span className="ml-2">Deleting this post...</span>
        </div>
      ) : flagDeletePost === 2 ? (
        <div className="flex items-center justify-center">
          <span className="ml-2">Deleted successfully!</span>
        </div>
      ) : (
        <>
          {post.isCurrentUser ? (
            <>
              <button onClick={() => deletePost(post.id)}>Delete</button>
              {/* Confirmation modal */}
            </>
          ) : null}
        </>
      )}
      {modalDeleteOpen && (
        <Modal onClose={handleCloseModalDelete}>
          <h2 className="text-xl font-bold mb-[20px]">Are you sure?</h2>

          {/* Add your new post form here */}
          <div className="flex space-x-4">
            <button
              className="flex-1 w-[100px] bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              onClick={handleDeletePost}
            >
              Yes
            </button>
            <button
              className="flex-1 w-[100px] bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
              onClick={handleCloseModalDelete}
            >
              No
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Post;
