import React from "react";

function Navbar() {
  return (
    <>
      <nav className="bg-black p-4">
        <h1 className="text-xl font-bold">My Navbar</h1>
        <ul className="flex space-x-4 mt-2">
          <li>
            <a href="/" className="text-white">
              Home
            </a>
          </li>
          <li>
            <a href="/about" className="text-white">
              About
            </a>
          </li>
          <li>
            <a href="/news" className="text-white">
              Contact
            </a>
          </li>
          <li>
            <a href="/login" className="text-white">
              Login
            </a>
          </li>
          <li>
            <a href="/todos" className="text-white">
              Todo List
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
