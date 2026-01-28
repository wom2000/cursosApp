import { useState } from "react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { Link } from "@inertiajs/react";

export default function MainLayout({ header, children }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const links = [
        { label: "HOMEPAGE", routeName: "home" },
        { label: "CURSOS", routeName: "AllCourses" },
        { label: "CONTEÚDOS", routeName: "AllMaterials" },
        { label: "PROGRESSO", routeName: "home" },
    ];

    return (
        <>
            <header>
                <div className="pink-section-header"></div>
                <div className="nav-content-div">
                    <div className="grid grid-cols-2 lg:grid-cols-3 items-center h-full">
                        {/* NAV WEBSITE TITLE */}
                        <div className="flex justify-start">
                            <div className="title-nav">
                                <a href={route("home")}>MIRAI</a>
                            </div>
                        </div>
                        {/* NAV LINKS LIST */}
                        <div className="hidden lg:flex justify-center nav-links">
                            {links.map((link) => {
                                return (
                                    <Link
                                        key={link.label}
                                        href={route(link.routeName)}
                                        className={`nav-link ${route().current(link.routeName) ? "active-link" : ""}`}
                                    >
                                        {link.label}
                                    </Link>
                                );
                            })}
                        </div>
                        {/* NAV BUTTONS */}
                        <div className="flex justify-end items-center">
                            <div className="hidden lg:flex items-center gap-4">
                                <Link
                                    href={route("login")}
                                    className="login-button"
                                >
                                    ENTRAR
                                </Link>
                                <Link
                                    href={route("CreateSubscription")}
                                    className="subscribe-button"
                                >
                                    SUBSCREVER
                                </Link>
                            </div>
                            <div className="flex lg:hidden">
                                <button
                                    onClick={() =>
                                        setMobileMenuOpen(!mobileMenuOpen)
                                    }
                                    className="inline-flex items-center justify-center p-2"
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
                {/* MOBILE HAMBURGUER MENU */}
                {mobileMenuOpen && (
                    <div className="lg:hidden max-w-full overflow-x-hidden px-2 pt-2 pb-3 space-y-1">
                        {/* MOBILE NAV LINKS LIST */}
                        {links.map((link) => (
                            <Link
                                key={link.label}
                                href={route(link.routeName)}
                                onClick={() => setMobileMenuOpen(false)}
                                className={`block w-full mobile-nav-link ${route().current(link.routeName) ? "mobile-active-link" : ""}`}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <div className="flex nav-links">
                            <Link
                                href={route("login")}
                                className="login-button"
                            >
                                ENTRAR{" "}
                            </Link>
                            <Link
                                href={route("CreateSubscription")}
                                className="subscribe-button"
                            >
                                SUBSCREVER
                            </Link>
                        </div>
                    </div>
                )}
            </header>
            <main>{children}</main>

            <footer className="bg-black text-white py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div>
                            <img src="/images/Footer.svg" />
                        </div>

                        <div>
                            <div className="mb-4">
                                <p className="text-gray-400 text-sm mb-1">
                                    Email:
                                </p>
                                <a href="mailto:hello@mirai.com">
                                    hello@mirai.com
                                </a>
                            </div>
                            <div className="mb-4">
                                <p className="text-gray-400 text-sm mb-1">
                                    Instagram
                                </p>
                                <a href="https://www.instagram.com">
                                    @mirai.cesae
                                </a>
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm mb-1">
                                    Facebook
                                </p>
                                <a href="https://www.facebook.com">
                                    MiraiCesae
                                </a>
                            </div>
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm mb-2">
                                Morada:
                            </p>
                            <p className="text-white mb-2">
                                Rua de Fundões 151, 3700-121 São João da Madeira
                            </p>
                            <p className="text-white mb-4">
                                (+351) 256 123 456
                            </p>
                            <p className="text-gray-400 text-sm">
                                Mirai © 2026 Cesae Digital
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
