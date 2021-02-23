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
                <Link href="#introduction">
                    <a className="block mt-4 lg:inline-block lg:mt-0 text-white mr-4 ">
                    Introduction
                    </a>
                </Link>
                <Link href="#contents">
                    <a className="block mt-4 lg:inline-block lg:mt-0 text-white mr-4">
                    Contents
                    </a>
                </Link>
                </div>
            </div>
            </nav>
        </header>
    )
}

export default Header;