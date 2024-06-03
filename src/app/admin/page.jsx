"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import AdminNav from "../_navbar/admin_nav";
import Footer from "@/component/Footer";
import Spin from "../../component/Loader";

import { Fragment } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
const Page = () => {
  const [open, setOpen] = useState(true);
  const { data: session, status } = useSession();
  const [data, setData] = useState([]);
  const [message, setMessage] = useState(null);
  const [stat, setStatus] = useState(null);
  const [modalData, setModalData] = useState({});
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState(null);
  const router = useRouter();
  const [originalData,setOriginalData] = useState([])
  // if (!session) {
  //   toast.error("You are not Authorized or Login First");
  //   setTimeout(() => {
  //     router.push("/login");
  //   }, 1000);
  // }
  const handleUpdateData = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await fetch("api/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id, message: message, isPlaced: stat }),
      });
      setLoading(false);
      fetchData();
      if (res.error) {
        toast.error("Ahh!Something Went Wrong");
      } else {
        toast.success("Updated Successfully");
      }
    } catch (error) {
      setLoading(false);
      toast.error("Internal Server Error");
    }
  };
  const fetchData = async () => {
    const res = await fetch("api/history");
    const data = await res.json();
    setOriginalData(data.data)
    setData(data.data);
    setLoading(false);
  };
  useEffect(() => {
    setLoading(true);
    setOpen(false);
    fetchData();
  }, []);

  const handleModal = (post) => {
    setOpen(true);
    setModalData(post);
    setMessage(post.message);
    setStatus(post.isPlaced);
    setId(post._id);
  };

  const [room, setRoom] = useState(null);
  const [year, setYear] = useState(null);

  const handleSearch = () => {
    const lowerYear = year
    const lowerRoom = room
    console.log(lowerRoom,lowerYear)
    if (lowerYear === '' || lowerRoom === '') {
      setData(originalData);
    } else {
      const filterData = originalData.filter((val) => {
        const newDate = new Date(val.createdAt);
        const yearPart = newDate.getFullYear().toString(); 
        console.log(val.room)   
        return val.room === lowerRoom && yearPart === lowerYear;
      });
      setData(filterData);
    }
  };

  return (
    <>
      <Toaster />
      <AdminNav />
      <div className="px-10 py-5 flex gap-4">
      <div className="flex items-center">
        <label
          htmlFor="sort1"
          className="block text-sm font-medium text-gray-700 mr-4"
        >
          Sort by Year.
        </label>
        <select
          id="sort1"
          name="sort1"
          onChange={(e) => setYear(e.target.value)}
          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="">-- Select Year --</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
        </select>
      </div>

      <div className="flex items-center">
        <label
          htmlFor="sort2"
          className="block text-sm font-medium text-gray-700 mr-4"
        >
          Sort by Room No.
        </label>
        <input
          type="text"
          id="customRoom"
          name="customRoom"
          onChange={(e) => setRoom(e.target.value)}
          value={room}
          placeholder="Enter Room No."
          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        />
      </div>

      <button
        type="button"
        className="px-5 py-2 bg-blue-500 text-white rounded-md"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
      {loading ? (
        <Spin />
      ) : (
        <ul role="list" className="divide-y divide-gray-100 px-10">
          {data &&
            data.map((person) => (
              <li
                key={person.email}
                className="flex justify-between gap-x-6 py-5"
              >
                <div className="flex min-w-0 gap-x-4">
                  <img
                    className="h-12 w-12 flex-none rounded-full bg-gray-50"
                    src={person.imageUrl}
                    alt=""
                  />
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      {person.name}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      {person.email}
                    </p>
                  </div>
                </div>

                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm leading-6 text-gray-900">
                    {person.isPlaced}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    <time dateTime={person.createdAt}>
                      {new Date(person.createdAt).toLocaleDateString()}
                    </time>
                  </p>

                  <div className="mt-1 flex items-center gap-x-1.5">
                    <p className="text-xs leading-5 text-gray-500">
                      Room : {person.room}
                    </p>
                  </div>
                </div>

                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end justify-center">
                  <div className="mt-1 flex items-center gap-x-1.5">
                    <button
                      className="text-base px-3 py-1.5 leading-6 text-gray-500 bg-gray-200 rounded-md hover:bg-gray-300"
                      onClick={() => handleModal(person)}
                    >
                      edit
                    </button>
                  </div>
                </div>

                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end justify-center">
                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    <time dateTime={person.createdAt}>
                      {new Date(person.createdAt).toLocaleDateString()}
                    </time>
                  </p>

                  <div className="mt-1 flex items-center gap-x-1.5">
                    <p className="text-xs leading-5 text-gray-500">
                      {person.isPlaced === "pending" ? "Pending" : "Accepted"}
                    </p>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      )}

      <Transition show={open}>
        <Dialog className="relative z-10" onClose={setOpen}>
          <TransitionChild
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </TransitionChild>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <TransitionChild
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <DialogTitle
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          Edit Field
                        </DialogTitle>
                        <form action="" onSubmit={handleUpdateData}>
                          <div className="mt-2 p-1">
                            <label
                              htmlFor="price"
                              className="block text-sm font-medium leading-6 text-gray-900 p-3"
                            >
                              Enter the Delivery Date
                            </label>
                            <input
                              type="text"
                              name="message"
                              id="price"
                              onChange={(e) => setMessage(e.target.value)}
                              value={message}
                              className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6  p-3"
                              placeholder="Enter the Delivery Date"
                            />

                            <div>
                              <label
                                htmlFor="price"
                                className="block text-sm font-medium leading-6 text-gray-900 p-3"
                              >
                                Update the Status
                              </label>
                              <div className="relative mt-2 rounded-md shadow-sm p-1">
                                <select
                                  id="currency"
                                  name="currency"
                                  onChange={(e) => setStatus(e.target.value)}
                                  value={stat}
                                  className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                                >
                                  <option value="accepted">Accepted</option>
                                  <option value="pending">Pending</option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:justify-between sm:px-6">
                            <button
                              type="submit"
                              className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                              onClick={() => setOpen(false)}
                            >
                              Save
                            </button>
                            <button
                              type="button"
                              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                              onClick={() => setOpen(false)}
                              data-autofocus
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>

      <Footer />
    </>
  );
};

export default Page;
