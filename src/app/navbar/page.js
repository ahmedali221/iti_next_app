import React from "react";
import Link from "next/link";

function Navbar() {
  return (
    <>
      <nav className="bg-black p-4">
        <h1 className="text-xl font-bold">My Navbar</h1>
        <ul className="flex space-x-4 mt-2">
          <li>
            <Link href="/" className="text-white">
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className="text-white">
              About
            </Link>
          </li>
          <li>
            <Link href="/news" className="text-white">
              Contact
            </Link>
          </li>
          <li>
            <Link href="/login" className="text-white">
              Login
            </Link>
          </li>
          <li>
            <Link href="/todos" className="text-white">
              Todo List
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
