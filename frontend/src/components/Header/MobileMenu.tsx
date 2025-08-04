import { SignOutButton, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

interface MobileMenuProps {
  navOpen: boolean;
  closeNav: () => void;
}

export function MobileMenu({ navOpen, closeNav }: MobileMenuProps) {
  const { user } = useUser();
  return (
    <>
      {navOpen && (
        <div
          onClick={closeNav}
          className="fixed inset-0 bg-black/50 z-20 transition-opacity duration-300 md:hidden"
          style={{ opacity: navOpen ? 1 : 0 }}
        />
      )}
      <div
        className={`fixed top-0 left-0 w-3/5 max-w-xs h-full bg-white shadow-xl z-30 transition-transform duration-300 ease-in-out transform md:hidden ${navOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <nav className="flex flex-col p-6 mt-20 space-y-6">
          <Link
            to="/"
            className="text-gray-800 font-medium text-lg"
            onClick={closeNav}
          >
            Home
          </Link>
          <Link
            to="/my-plans"
            className="text-gray-800 font-medium text-lg"
            onClick={closeNav}
          >
            My Plans
          </Link>
          {user ? (
            <SignOutButton>
              <button className="text-gray-800 font-medium text-lg text-left">
                Logout
              </button>
            </SignOutButton>
          ) : (
            <Link
              to="/authenticate"
              className="text-gray-800 font-medium text-lg"
              onClick={closeNav}
            >
              Login / Sign Up
            </Link>
          )}
        </nav>
      </div>
    </>
  );
}
