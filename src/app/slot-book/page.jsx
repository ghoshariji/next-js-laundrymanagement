"use client";
import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Dialog, Transition } from "@headlessui/react";
import Navbar from "../_navbar/navbar";
import Footer from "@/component/Footer";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Spin from "../../component/Loader";
import toast from "react-hot-toast";
import { SP } from "next/dist/shared/lib/utils";

export default function Example() {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();
  if (!session) {
    router.push("/login");
  }
  const [loading, setLoading] = useState(false);
  const { name, email, hostel, room } = session.user;
  const [post, setPost] = useState({
    name: name || "",
    email: email || "",
    hostel: hostel || "",
    room: room || "",
    phone: "",
    jeans: "",
    shirt: "",
    scshirt: "",
    bedsheet: "",
    towel: "",
    others: "",
    message: "",
  });

  const handleInput = (event) => {
    setPost({ ...post, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    try {
      await fetch("api/bookslot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      });
      setLoading(false);
      toast.success("Order Placed");
      setPost("");
    } catch (error) {
      toast.error("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      {loading ? (
        <Spin />
      ) : (
        <div className="isolate bg-white px-6 py-5 sm:py-15 lg:px-8 mt-1">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              New Order
            </h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Aute magna irure deserunt veniam aliqua magna enim voluptate.
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            method="POST"
            className="mx-auto mt-16 max-w-xl sm:mt-20"
          >
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="first-name"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Name
                </label>
                <div className="mt-2.5">
                  <input
                    type="text"
                    name="name"
                    value={session.user.name}
                    id="first-name"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="room"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Room no.
                </label>
                <div className="mt-2.5">
                  <input
                    type="text"
                    name="room"
                    id="room"
                    value={session.user.room}
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="company"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Hostel Name
                </label>
                <div className="mt-2.5">
                  <input
                    type="text"
                    name="hostel"
                    id="hostel"
                    value={session.user.hostel}
                    autoComplete="organization"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Email
                </label>
                <div className="mt-2.5">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={session.user.email}
                    autoComplete="email"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="phone-number"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Phone number
                </label>
                <div className=" mt-2.5">
                  <input
                    type="tel"
                    name="phone"
                    onChange={handleInput}
                    value={post.phone}
                    id="phone-number"
                    autoComplete="tel"
                    placeholder="eg:7439xxxxxx"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="first-name"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Shirt
                </label>
                <div className="mt-2.5">
                  <input
                    type="number"
                    name="shirt"
                    id="first-name"
                    onChange={handleInput}
                    value={post.shirt}
                    autoComplete="given-name"
                    placeholder="eg:1"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="last-name"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Jeans
                </label>
                <div className="mt-2.5">
                  <input
                    type="number"
                    name="jeans"
                    id="last-name"
                    placeholder="eg:1"
                    onChange={handleInput}
                    value={post.jeans}
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="first-name"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  School Shirt
                </label>
                <div className="mt-2.5">
                  <input
                    type="number"
                    name="scshirt"
                    id="first-name"
                    placeholder="eg:1"
                    onChange={handleInput}
                    value={post.scshirt}
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="last-name"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Towel
                </label>
                <div className="mt-2.5">
                  <input
                    type="number"
                    name="towel"
                    id="last-name"
                    placeholder="eg:1"
                    onChange={handleInput}
                    value={post.towel}
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="first-name"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Bed Sheet
                </label>
                <div className="mt-2.5">
                  <input
                    type="number"
                    name="bedsheet"
                    id="first-name"
                    placeholder="eg:1"
                    onChange={handleInput}
                    value={post.bedsheet}
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="last-name"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Others
                </label>
                <div className="mt-2.5">
                  <input
                    type="text"
                    name="others"
                    id="last-name"
                    placeholder="eg:blanket"
                    onChange={handleInput}
                    value={post.others}
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Message
                </label>
                <div className="mt-2.5">
                  <textarea
                    name="message"
                    id="message"
                    onChange={handleInput}
                    value={post.message}
                    rows={4}
                    placeholder="Leave a Comment"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={""}
                  />
                </div>
              </div>
              <div className="flex gap-x-4 sm:col-span-2">
                <label
                  htmlFor="privacy-policy"
                  className="text-sm leading-6 text-gray-600"
                >
                  By selecting this, you agree to our{" "}
                  <button
                    type="button"
                    onClick={() => setShowModal(true)}
                    className="font-semibold text-indigo-600"
                  >
                    privacy&nbsp;policy
                  </button>
                  .
                </label>
              </div>
            </div>

            <Transition appear show={showModal} as="div">
              <Dialog
                as="div"
                className="relative z-10"
                onClose={() => setShowModal(false)}
              >
                <Transition.Child
                  as="div"
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
                      as="div"
                      enter="ease-out duration-300"
                      enterFrom="opacity-0 scale-95"
                      enterTo="opacity-100 scale-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100 scale-100"
                      leaveTo="opacity-0 scale-95"
                    >
                      <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-medium leading-6 text-gray-900"
                        >
                          Privacy Policy
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Your privacy policy content goes here. Explain how
                            you handle user data, privacy measures, etc.
                          </p>
                        </div>

                        <div className="mt-4">
                          <button
                            type="button"
                            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                            onClick={() => setShowModal(false)}
                          >
                            Got it, thanks!
                          </button>
                        </div>
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </Dialog>
            </Transition>

            <div className="mt-10">
              <button
                type="submit"
                className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
      <Footer />
    </>
  );
}
