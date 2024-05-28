// import { useState } from 'react';
// import Link from 'next/link'; // Import Link from Next.js
// import { Bars3Icon } from '@heroicons/react/24/outline';

// const navigation1 = [
//   { name: 'Home', href: '/login' }, // Ensure href points to the correct route
//   // { name: 'Book order', href: '#' },
//   // { name: 'History', href: '#' },
//   // { name: 'About', href: '#' },
// ];

// export default function Navbar() {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   return (
//     <>
//       <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
//         <div className="flex lg:flex-1">
//           <a href="#" className="-m-1.5 p-1.5">
//             <span className="sr-only">Your Company</span>
//             <img
//               className="h-8 w-auto"
//               src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
//               alt=""
//             />
//           </a>
//         </div>
//         <div className="flex lg:hidden">
//           <button
//             type="button"
//             className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
//             onClick={() => setMobileMenuOpen(true)}
//           >
//             <span className="sr-only">Open main menu</span>
//             <Bars3Icon className="h-6 w-6" aria-hidden="true" />
//           </button>
//         </div>
        
//         <div className="hidden lg:flex lg:gap-x-12">
//           {navigation1.map((item) => (
//             <Link key={item.name} href={item.href}>
//               <a className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-400/10">
//                 {item.name}
//               </a>
//             </Link>
//           ))}
//         </div>
//         <div className="hidden lg:flex lg:flex-1 lg:justify-end">
//           <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
//             Log out <span aria-hidden="true">&rarr;</span>
//           </a>
//         </div>
//       </nav>
//     </>
//   );
// }
