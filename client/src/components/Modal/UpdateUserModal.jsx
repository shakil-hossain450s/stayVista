import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import PropTypes from 'prop-types';

const UpdateUserModal = ({ isOpen, closeModal, onSubmit, defaultName = "", defaultPhoto = "" }) => {
  const [name, setName] = useState(defaultName);
  const [photo, setPhoto] = useState(defaultPhoto);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, photo });

    // Close modal
    closeModal();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="scale-95 opacity-0"
              enterTo="scale-100 opacity-100"
              leave="ease-in duration-150"
              leaveFrom="scale-100 opacity-100"
              leaveTo="scale-95 opacity-0"
            >
              <Dialog.Panel className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg space-y-4">
                <Dialog.Title className="text-lg font-semibold">
                  Update User Information
                </Dialog.Title>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name Input */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full border rounded px-3 py-2"
                      placeholder="Enter name"
                      required
                    />
                  </div>

                  {/* Photo Input */}
                  <div>
                    <input
                      type="file"
                      onChange={e => setPhoto(e.target.files[0])}
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-4 py-2 bg-gray-200 rounded"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded"
                    >
                      Update
                    </button>
                  </div>
                </form>

              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

UpdateUserModal.propTypes = {
  isOpen: PropTypes.bool,
  closeModal: PropTypes.func,
  onSubmit: PropTypes.func,
  defaultName: PropTypes.string,
  defaultPhoto: PropTypes.string
}

export default UpdateUserModal;
