"use client"
import { Fragment, useState } from 'react'
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Dialog, Menu, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { ArrowLeftIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import CPDForm from '../dashboard/CPDForm'
import KanbanBoard from "../dashboard/Board";
import Summary from "../dashboard/Summary";
import { Logo } from '@/components/Logo';
import { signOut, useSession } from 'next-auth/react';
import Profile from './Profile';
import { downloadFile, getNameFromEmail, showToast, TOAST_TYPES } from '@/utils';
import { IMAGES } from '@/images';
import Image from 'next/image';
import { Suspense } from 'react';

const servicesComponent = {
  "CPD summary":<Suspense fallback={<div>Loading dashboard...</div>}><Summary />    </Suspense>
,
  "Log my CPD": <CPDForm />,
  "CPD plan":<Suspense fallback={<div>Loading plan...</div>}><KanbanBoard /> </Suspense> ,
  "Profile": <Suspense fallback={<div>Loading plan...</div>}><Profile /> </Suspense> 
}
const selectedService = ["CPD summary", "Log my CPD", "CPD plan", "Profile",]


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {

  const { data: session } = useSession();

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter();
  const searchParams = useSearchParams()
  const renderedService = (searchParams.get("service") || "CPD summary")


  if (!selectedService.includes(renderedService)) {
    // Redirect to a custom not found page or handle it accordingly
    router.push("/404"); // Replace '/not-found' with your actual not found route
    return null; // Prevent rendering while redirecting
  }

  const getUserName = () => {
    return session?.user.user.first_name ? `${session?.user.user.first_name} ${session?.user.user.last_name}` : getNameFromEmail(session?.user.user.email);
  }

  const downloadSummary = () => {
    fetch(`/api/downloadSummary?user_token=${session?.user.token}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Something went wrong on downloading your profile');
        }
        return res.json()
      })
      .then((result) => {
        if (result.hasOwnProperty('success') && !result.success) {
          throw new Error('Something went wrong on downloading your profile')
        }
        downloadFile(result.file_url, `${session?.user.user.first_name} ${session?.user.user.last_name} Summary.pdf`)

      }).catch((err) => {
        showToast(TOAST_TYPES.ERROR, err.message);
      })
  }

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className='flex grow flex-col overflow-y-auto'>

                    <div className="flex h-16 shrink-0 items-center justify-center bg-white -px-6 w-[100%]">
                      <Link href={'/'}>
                        <Logo width={100} height={100} />
                      </Link>
                    </div>
                    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 py-8 pb-4">
                      <nav className="flex flex-1 flex-col">
                        <ul role="list" className="flex flex-1 flex-col gap-y-7">
                          <li>
                            <ul role="list" className="-mx-2 space-y-1">
                              {selectedService.map((service, index) => (
                                <Link scroll={false} href={`?${new URLSearchParams({
                                  service
                                })}`} className={`${service === renderedService
                                  ? 'bg-gray-800 text-white'
                                  : 'text-gray-400 hover:text-white hover:bg-gray-400'
                                  } group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold ${renderedService === service.name ? 'selectedService' : 'nonselectedService'
                                  }`}
                                  key={index}>
                                  {service.charAt(0).toUpperCase() + service.slice(1)}
                                </Link>))}
                            </ul>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex h-16 shrink-0 items-center justify-center bg-white w-[100%]">
            <Link href={'/'}>
              <Logo width={100} height={100} />
            </Link>
          </div>
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 py-8 pb-4">
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {selectedService.map((service, index) => (
                      <Link scroll={false} href={`?${new URLSearchParams({
                        service
                      })}`} className={`${service === renderedService
                        ? 'bg-gray-800 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-gray-400'
                        } group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold ${renderedService === service.name ? 'selectedService' : 'nonselectedService'
                        }`}
                        key={index}>{service.charAt(0).toUpperCase() + service.slice(1)}
                      </Link>))}
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="lg:pl-72">
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <button type="button" className="-m-2.5 p-2.5 text-gray-700 lg:hidden" onClick={() => setSidebarOpen(true)}>
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Separator */}
            <div className="h-6 w-px bg-gray-900/10 lg:hidden" aria-hidden="true" />

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
              <div className='h-full w-full flex flex-row items-center'>
                <Link href={'/'} className='py-0 sm:pl-4 pr-0 flex flex-row items-center '>
                  <ArrowLeftIcon className="h-6 w-6" aria-hidden="true" />
                  <p className='sm:px-8 px-2 sm:text-30 text-nowrap font-medium text-gray-700 '>Go Home</p>
                </Link>
              </div>
              <div className="flex items-center gap-x-4 lg:gap-x-6">
                {/* Separator */}
                <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10" aria-hidden="true" />
                {/* Profile dropdown */}
                <Menu as="div" className="relative">
                  <Menu.Button className="-m-1.5 flex items-center p-1.5 pr-6">
                    <span className="sr-only">Open user menu</span>
                    <Image src={session?.user.user.profile_image ?? IMAGES.PROFILE.userImage} width={25} height={25} className='rounded-full' />
                    <span className="hidden lg:flex lg:items-center">
                      <span className="ml-4 text-sm font-semibold text-nowrap leading-6 text-gray-900" aria-hidden="true">
                        {getUserName()}
                      </span>
                      <ChevronDownIcon className="ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                    </span>
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                      <Menu.Item >
                        <button
                          onClick={downloadSummary}
                          className={classNames(
                            'block px-3 py-1  text-sm leading-6 hover:text-white hover:bg-gray-600 text-gray-900 w-full'
                          )}
                        >
                          {"Download"}
                        </button>
                      </Menu.Item>
                      <Menu.Item >
                        <button
                          onClick={() => signOut()}
                          className={classNames(
                            'block px-3 py-1 text-sm leading-6 hover:text-white hover:bg-gray-600 text-gray-900 w-full'
                          )}
                        >
                          {"Sign out"}
                        </button>
                      </Menu.Item>

                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <main className="py-10">
            <div className="px-4 sm:px-6 lg:px-8"> {servicesComponent[renderedService]}</div>
          </main>
        </div>
      </div>
    </>
  )
}
