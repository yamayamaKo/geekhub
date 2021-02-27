import React from 'react'
import Link from 'next/link'

const Header = () => {
    return(
        <header>
            <nav className="flex items-center justify-between flex-wrap p-6 bg-black bg-opacity-75">
            <div className="flex items-center flex-shrink-0 text-white mr-6">
                <Link href="/">
                    <a className="font-semibold text-xl tracking-tight">
                        GeekHub
                    </a>
                </Link>
            </div>
            <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                <div className="text-sm lg:flex-grow">
                <Link href="/event">
                    <a className="block mt-4 lg:inline-block lg:mt-0 text-white mr-4 ">
                    検索
                    </a>
                </Link>
                <Link href="/favorite">
                    <a className="block mt-4 lg:inline-block lg:mt-0 text-white mr-4">
                    マイページ
                    </a>
                </Link>
                <Link href="/recommendation">
                    <a className="block mt-4 lg:inline-block lg:mt-0 text-white mr-4">
                    おすすめ
                    </a>
                </Link>
                </div>
            </div>
            </nav>
        </header>
    )
}

export default Header;