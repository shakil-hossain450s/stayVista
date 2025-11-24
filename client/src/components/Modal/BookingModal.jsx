import PropTypes from 'prop-types'
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react'
import { format } from 'date-fns'
import { Fragment } from 'react'

const BookingModal = ({ closeModal, isOpen, bookingInfo }) => {

  const { title, location, from, to, price, guest: { name } } = bookingInfo;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={closeModal}>
        <TransitionChild
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-25' />
        </TransitionChild>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <TransitionChild
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <DialogPanel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                <DialogTitle
                  as='h3'
                  className='text-lg font-medium text-center leading-6 text-gray-900'
                >
                  Review Info Before Reserve
                </DialogTitle>
                <div className='mt-2'>
                  <p className='text-sm text-gray-500'>
                    Room: {title}
                  </p>
                </div>
                <div className='mt-2'>
                  <p className='text-sm text-gray-500'>
                    Location: {location}
                  </p>
                </div>
                <div className='mt-2'>
                  <p className='text-sm text-gray-500'>
                    Guest: {name.charAt(0).toUpperCase() + name.slice(1)}
                  </p>
                </div>
                <div className='mt-2'>
                  <p className='text-sm text-gray-500'>
                    From: {format(new Date(from), 'PP')} - To:{' '}
                    {format(new Date(to), 'PP')}
                  </p>
                </div>

                <div className='mt-2'>
                  <p className='text-sm text-gray-500'>
                    Price: $ {price}
                  </p>
                </div>
                <hr className='mt-8 ' />
                {/* checkout form */}

                <div className='flex mt-2 justify-around'>
                  <button
                    type='button'
                    className='inline-flex justify-center rounded-md border border-transparent bg-green-200 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2'

                  >
                    Book
                  </button>
                  <button
                    onClick={closeModal}
                    type='button'
                    className='inline-flex justify-center rounded-md border border-transparent bg-red-200 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2'
                  >
                    No
                  </button>
                </div>

              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

BookingModal.propTypes = {
  bookingInfo: PropTypes.object,
  closeModal: PropTypes.func,
  isOpen: PropTypes.bool,
}

export default BookingModal