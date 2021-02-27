import {Component} from 'react'
import Link from 'next/link'

const Contents = () => {

    return(
        <div className='flex items-center justify-center bg-gray-100' id='contents'>
        <div className='px-3'>
            <div className='test-4xl sm:text-5xl text-center py-10'>
                GeekHubでできること
            </div>

            <div className='grid md:grid-cols-4 gap-8 m-5 max-w-5xl m-auto py-5'>
                <div className="bg-white">
                <img src="../static/icons/search.svg" style={{objectFit:"contain"}} alt="" className="w-full h-48 sm:h-56 object-cover" />
                <div className="h-48 px-10 py-6 mb-10 text-center">
                    <div className="text-2xl font-bold text-purple-500 mb-4">検索</div>
                    <span className="text-sm">
                    技育祭のイベントについて検索することができます
                    </span>
                </div>
                <Link href='event'>
                <button className="w-full text-lg h-16 text-white font-extrabold bg-purple-500 hover:opacity-60">やってみる</button>
                </Link>
                </div>

                <div className="bg-white">
                <img src="../static/icons/star.svg" style={{objectFit:"contain"}} alt="" className="w-full h-48 sm:h-56 object-cover" />
                <div className="h-48 px-10 py-6 mb-10 text-center">
                    <div className="text-2xl font-bold text-purple-500 mb-4">マイページ</div>
                    <span className="text-sm">
                    あなたがお気に入りに登録したイベントや、過去に気になったイベントについて確認することができます
                    </span>
                </div>
                <Link href='/favorite'>
                    <button className="w-full text-lg h-16 text-white font-extrabold bg-purple-500 hover:opacity-60">やってみる</button>
                </Link>
                </div>

                <div className="bg-white">
                <img src="../static/icons/questionnaire.svg" style={{objectFit:"contain"}} alt="" className="w-full h-48 sm:h-56 object-cover" />
                <div className="h-48 px-10 py-6 mb-10 text-center">
                    <div className="text-2xl font-bold text-purple-500 mb-4">おすすめ</div>
                    <span className="text-sm">
                    あなたにおすすめのイベントを自動で推薦します
                    </span>
                </div>
                <Link href='/recommendation'>
                    <button className="w-full text-lg h-16 text-white font-extrabold bg-purple-500 hover:opacity-60">やってみる</button>
                </Link>
                </div>

                <div className="bg-white">
                <img src="../static/icons/ranking.svg" style={{objectFit:"contain"}} alt="" className="w-full h-48 sm:h-56 object-cover" />
                <div className="h-48 px-10 py-6 mb-10 text-center">
                    <div className="text-2xl font-bold text-purple-500 mb-4">ランキング</div>
                    <span className="text-sm">
                    人気のイベントを知ることができます
                    </span>
                </div>
                <Link href='ranking'>
                <button className="w-full text-lg h-16 text-white font-extrabold bg-purple-500 hover:opacity-60">やってみる</button>
                </Link>
                </div>            
            </div>
        </div>
        </div>
    )
}

export default Contents;