// resources/js/Pages/Homepage.jsx
import { Head, Link } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import GuestLayout from "@/Layouts/GuestLayout";

export default function Homepage({ auth, cursosDestaque, categorias }) {
    const Layout = auth.user ? MainLayout : GuestLayout;

    return (
        <Layout>
            <Head title="Mirai - Aprende ao Teu Ritmo" />

            {/* Hero Section - Gradiente Roxo */}
            <div className="relative min-h-[80vh] bg-gradient-to-br from-indigo-600 via-purple-600 to-purple-700 overflow-hidden flex items-center">
                {/* Decorative background elements */}
                <div className="absolute inset-0 bg-black/10"></div>

                <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 w-full">
                    <div className="text-center">
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-8">
                            Aprende ao Teu Ritmo
                        </h1>
                        <p className="mt-6 text-lg md:text-xl text-purple-100 max-w-3xl mx-auto leading-relaxed">
                            Acesso a cursos de qualidade em diversas áreas. Desenvolve as tuas competências
                            com conteúdos criados por especialistas.
                        </p>
                        <div className="mt-12">
                            <Link
                                href={route('cursos.index')}
                                className="inline-block bg-white text-indigo-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-purple-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                            >
                                Explorar Cursos
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Secção "Explora as Nossas Áreas" - Fundo Preto */}
            <div className="bg-black py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12 uppercase tracking-wide">
                        Explora as Nossas Áreas
                    </h2>

                    {categorias && categorias.length > 0 ? (
                        <div className="grid gap-0 md:grid-cols-2 lg:grid-cols-3">
                            {categorias.slice(0, 6).map((categoria, index) => (
                                <Link
                                    key={categoria.id}
                                    href={route('cursos.index', { area: categoria.id })}
                                    className={`group relative bg-white p-8 min-h-[280px] flex flex-col justify-between transition-all duration-300 hover:bg-gray-50 ${
                                        index % 3 !== 2 ? 'lg:border-r border-gray-200' : ''
                                    } ${
                                        index < 3 ? 'border-b border-gray-200' : ''
                                    }`}
                                >
                                    <div>
                                        <h3 className="text-2xl font-bold text-black mb-4 uppercase">
                                            {categoria.nome}
                                        </h3>
                                        <p className="text-gray-600 text-sm leading-relaxed">
                                            {categoria.descricao || 'Our facility is the optimal environment for strength training and performance, fully equipped with top of the line tools, whilst avoiding any unnecessary bells and whistles that push costs onto you.'}
                                        </p>
                                    </div>

                                    <div className="mt-6 flex items-center text-indigo-600 font-semibold group-hover:text-pink-600 transition-colors">
                                        <span className="mr-2">VER MAIS</span>
                                        <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="grid gap-0 md:grid-cols-2 lg:grid-cols-3">
                            {['Marketing Digital', 'Programação', 'Design'].map((area, index) => (
                                <div
                                    key={area}
                                    className={`bg-white p-8 min-h-[280px] flex flex-col justify-between ${
                                        index % 3 !== 2 ? 'lg:border-r border-gray-200' : ''
                                    } border-b border-gray-200`}
                                >
                                    <div>
                                        <h3 className="text-2xl font-bold text-black mb-4 uppercase">
                                            {area}
                                        </h3>
                                        <p className="text-gray-600 text-sm leading-relaxed">
                                            Our facility is the optimal environment for strength training and performance, fully equipped with top of the line tools, whilst avoiding any unnecessary bells and whistles that push costs onto you.
                                        </p>
                                    </div>

                                    <div className="mt-6 flex items-center text-indigo-600 font-semibold">
                                        <span className="mr-2">VER MAIS</span>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Secção "Eleva as Tuas Skills" - Alternado */}
            <div className="bg-black py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-16 uppercase tracking-wide">
                        Eleva as Tuas Skills de Programação
                    </h2>

                    {/* Bloco 1 - Imagem Esquerda */}
                    <div className="grid lg:grid-cols-2 gap-0 mb-0">
                        <div className="bg-gray-900 flex items-center justify-center p-12 min-h-[400px]">
                            <div className="text-center">
                                <div className="w-full h-64 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                                    <svg className="w-32 h-32 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white p-12 flex flex-col justify-center min-h-[400px]">
                            <h3 className="text-3xl font-bold text-black mb-4 uppercase">
                                Laravel + Filament
                            </h3>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                Train like an athlete with top-tier equipment and expert programming. Whether you're building mass, dropping fat, or just want to push past limits.
                            </p>
                            <div>
                                <Link
                                    href={route('cursos.index')}
                                    className="inline-flex items-center text-indigo-600 font-semibold hover:text-pink-600 transition-colors"
                                >
                                    <span className="mr-2">VER MAIS</span>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Bloco 2 - Imagem Direita */}
                    <div className="grid lg:grid-cols-2 gap-0">
                        <div className="bg-white p-12 flex flex-col justify-center min-h-[400px] order-2 lg:order-1">
                            <h3 className="text-3xl font-bold text-black mb-4 uppercase">
                                React.js Avançado
                            </h3>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                Train like an athlete with top-tier equipment and expert programming. Whether you're building mass, dropping fat, or just want to push past limits.
                            </p>
                            <div>
                                <Link
                                    href={route('cursos.index')}
                                    className="inline-flex items-center text-indigo-600 font-semibold hover:text-pink-600 transition-colors"
                                >
                                    <span className="mr-2">VER MAIS</span>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                        <div className="bg-gray-900 flex items-center justify-center p-12 min-h-[400px] order-1 lg:order-2">
                            <div className="text-center">
                                <div className="w-full h-64 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                    <svg className="w-32 h-32 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer - Fundo Preto */}
            <footer className="bg-black text-white py-12 border-t border-gray-800">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Logo e Powered by */}
                        <div>
                            <h3 className="text-3xl font-bold mb-2">MIRAI</h3>
                            <p className="text-gray-400 text-sm">powered by Cesae</p>
                        </div>

                        {/* Contactos */}
                        <div>
                            <div className="mb-4">
                                <p className="text-gray-400 text-sm mb-1">Email:</p>
                                <a href="mailto:hello@mirai.com" className="text-pink-500 hover:text-pink-400 transition-colors">
                                    hello@mirai.com
                                </a>
                            </div>
                            <div className="mb-4">
                                <p className="text-gray-400 text-sm mb-1">Instagram</p>
                                <a href="https://instagram.com/mirai.cesae" className="text-pink-500 hover:text-pink-400 transition-colors">
                                    @mirai.cesae
                                </a>
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm mb-1">Facebook</p>
                                <a href="https://facebook.com/MiraiCesae" className="text-pink-500 hover:text-pink-400 transition-colors">
                                    MiraiCesae
                                </a>
                            </div>
                        </div>

                        {/* Morada */}
                        <div>
                            <p className="text-gray-400 text-sm mb-2">Morada:</p>
                            <p className="text-white mb-2">
                                Rua de Fundões 151, 3700-121 São João da Madeira
                            </p>
                            <p className="text-white mb-4">(+351) 256 123 456</p>
                            <p className="text-gray-400 text-sm">
                                Mirai © 2026 Cesae Digital
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </Layout>
    );
}
