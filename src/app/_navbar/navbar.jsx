"use client"

import { useState } from 'react';
import Link from 'next/link';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { signOut } from 'next-auth/react';

const navigation1 = [
  { name: 'Home', href: '/home' },
  { name: 'Book Slot', href: '/slot-book' },
  { name: 'History', href: '/history' },
  { name: 'About', href: '/about' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt=""
            />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <div className="hidden lg:flex lg:gap-x-12">
          {navigation1.map((item) => (
            <div key={item.name} className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-400/10">
              <Link href={item.href}>
                {item.name}
              </Link>
            </div>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link href="#" className="text-sm font-semibold leading-6 text-gray-900" onClick={()=>signOut({ callbackUrl: "/login" })}>
            Log out <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </nav>
    </>
  );
}
