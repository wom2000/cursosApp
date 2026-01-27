import { useState } from "react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { Link } from "@inertiajs/react";

export default function MainLayout({ header, children }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const links = [
        { label: "HOMEPAGE", routeName: "home" },
        { label: "CURSOS", routeName: "cursos.index" },
        { label: "CONTEÚDOS", routeName: "AllMaterials" },
        { label: "PROGRESSO", routeName: "home" },
    ];

    return (
        <>
            <header>
                <div className="pink-section-header"></div>
                <div className="nav-content-div">
                    <div className="grid grid-cols-2 md:grid-cols-3 items-center h-full">
                        {/* NAV WEBSITE TITLE */}
                        <div className="flex justify-start">
                            <div className="title-nav">
                                <a href={route("home")}>MIRAI</a>
                            </div>
                        </div>
                        {/* NAV LINKS LIST */}
                        <div className="hidden md:flex justify-center nav-links">
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
                            <div className="hidden md:flex items-center gap-4">
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
                            <div className="flex md:hidden">
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
                    <div className="md:hidden max-w-full overflow-x-hidden px-2 pt-2 pb-3 space-y-1">
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
                                ENTRAR
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
            <footer className="grid grid-cols-2 md:grid-cols-3 ">
                <div className="footer-left ">
                    <img src="/images/Footer.svg" />
                </div>
                <div className="footer-center">
                    <div className="footer-email">
                        <p>Email:</p>
                        <p>
                            <a href="mailto:hello@mirai.com">hello@mirai.com</a>
                        </p>
                    </div>
                    <div className="footer-instagram">
                        <p>Instagram</p>
                        <p>
                            <a href="https://www.instagram.com">@mirai.cesae</a>
                        </p>
                    </div>
                    <div className="footer-facebook">
                        <p>Facebook</p>
                        <p>
                            <a href="https://www.facebook.com">MiraiCesae</a>
                        </p>
                    </div>
                </div>
                <div className="footer-right">
                    <p>Morada:</p>
                    <p>Rua de Fundões 151, 3700-121 São João da Madeira</p>
                    <p>(+351) 256 123 456</p>
                    <p>Mirai &copy; 2026 Cesae Digital</p>
                </div>
            </footer>
        </>
    );
}
