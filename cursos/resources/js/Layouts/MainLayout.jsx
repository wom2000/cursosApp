import { useState } from "react";
import { MenuIcon, XIcon, UserCircleIcon } from "@heroicons/react/outline";

export default function MainLayout({ header, children }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [activeLink, setActiveLink] = useState({ header });

    const links = ["Homepage", "Cursos", "Conteúdos", "Progresso"];
    const profileLinks = ["Perfil", "Sair"];

    return (
        <>
            <header className="text-white">
                <div className="pink-section-header"></div>
                <div className="">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <p>MIRAI</p>
                            </div>
                            <div className="hidden md:flex md:ml-6 space-x-4">
                                {links.map((link) => (
                                    <button
                                        key={link}
                                        onClick={() => setActiveLink(link)}
                                        className={`px-3 py-2 rounded-md text-sm font-medium ${
                                            activeLink === link
                                                ? "bg-gray-900"
                                                : "hover:bg-gray-700"
                                        }`}
                                    >
                                        {link}
                                    </button>
                                ))}
                            </div>
                        </div>{" "}
                        <div className="flex items-center">
                            <div className="hidden md:flex md:ml-4 relative">
                                <button
                                    onClick={() => setProfileOpen(!profileOpen)}
                                    className="bg-gray-800 p-1 rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                                >
                                    <UserCircleIcon className="h-8 w-8" />
                                </button>
                                {profileOpen && (
                                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white text-gray-800 ring-1 ring-black ring-opacity-5">
                                        {profileLinks.map((link) => (
                                            <a
                                                key={link}
                                                href="#"
                                                className="block px-4 py-2 text-sm hover:bg-gray-100"
                                            >
                                                {link}
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="flex md:hidden">
                                <button
                                    onClick={() =>
                                        setMobileMenuOpen(!mobileMenuOpen)
                                    }
                                    className="inline-flex items-center justify-center p-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                                >
                                    {mobileMenuOpen ? (
                                        <XIcon className="block h-6 w-6" />
                                    ) : (
                                        <MenuIcon className="block h-6 w-6" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {mobileMenuOpen && (
                    <div className="md:hidden px-2 pt-2 pb-3 space-y-1">
                        {links.map((link) => (
                            <button
                                key={link}
                                onClick={() => {
                                    setActiveLink(link);
                                    setMobileMenuOpen(false);
                                }}
                                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                                    activeLink === link
                                        ? "bg-gray-900"
                                        : "hover:bg-gray-700"
                                }`}
                            >
                                {link}
                            </button>
                        ))}

                        {/* Mobile Profile Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setProfileOpen(!profileOpen)}
                                className="flex items-center px-3 py-2 rounded-md w-full hover:bg-gray-700"
                            >
                                <UserCircleIcon className="h-6 w-6 mr-2" />
                                Perfil
                            </button>
                            {profileOpen && (
                                <div className="mt-1 space-y-1">
                                    {profileLinks.map((link) => (
                                        <a
                                            key={link}
                                            href="#"
                                            className="block px-5 py-2 rounded-md hover:bg-gray-600"
                                        >
                                            {link}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </header>
            {/* {header && (
                <header>
                    <div>{header}</div>
                </header>
            )} */}

            <main>{children}</main>
            <footer>Footer</footer>
        </>
    );
}
