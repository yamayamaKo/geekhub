import {Component} from 'react'
import Link from 'next/link'

const Contents = () => {

    return(
        <div className='flex items-center justify-center bg-gray-100' id='contents'>
        <div className='px-3'>
            <div className='test-4xl sm:text-5xl text-center py-10'>
                GeekHubでできること
            </div>

            <div className='grid md:grid-cols-3 gap-8 m-5 max-w-5xl m-auto py-5'>
            <div className="bg-white">
            <img src="../static/icons/search.svg" style={{objectFit:"contain"}} alt="" className="w-full h-48 sm:h-56 object-cover" />
            <div className="h-48 px-10 py-6 mb-10 text-center">
                <div className="text-2xl font-bold text-purple-500 mb-4">検索</div>
                <span className="text-sm">
                技育祭のイベントについて検索することができます
                {/* Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptate tempore eligendi magnam distinctio molestias. Incidunt at consequuntur consequatur 
                officiis repudiandae! Culpa cum vel tenetur itaque eius provident voluptatum similique impedit? */}
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
                {/* Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptate tempore eligendi magnam distinctio molestias. Incidunt at consequuntur consequatur 
                officiis repudiandae! Culpa cum vel tenetur itaque eius provident voluptatum similique impedit? */}
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
                {/* Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptate tempore eligendi magnam distinctio molestias. Incidunt at consequuntur consequatur 
                officiis repudiandae! Culpa cum vel tenetur itaque eius provident voluptatum similique impedit? */}
                </span>
            </div>
            <Link href='/recommendation'>
                <button className="w-full text-lg h-16 text-white font-extrabold bg-purple-500 hover:opacity-60">やってみる</button>
            </Link>
            </div>
            </div>
        </div>
        </div>

        
        // <div className="max-w-screen-xl mt-24 px-8 xl:px-16 mx-auto" id="contens">
        //     <div className="grid grid-cols-3 gap-4 text-center">
        //         <div>
        //             <img src='../static/icons/search.svg'/>
        //             <h1>イベント検索</h1>
        //             <p>技育祭のイベントについてここから調べることができます</p>
        //             <Link href='/event' passHref>
        //                 <Button>
        //                     行ってみる
        //                 </Button>
        //             </Link>
        //         </div>
        //         <div>
        //             <img src='../static/icons/star.svg'/>
        //             <h1>お気に入り</h1>
        //             <p>あなたがお気に入りに登録したイベントについてここで確認することができます</p>
        //             <Link href='/favorite' passHref>
        //                 <Button>
        //                     行ってみる
        //                 </Button>
        //             </Link>
        //         </div>
        //         <div>
        //             <img src='../static/icons/questionnaire.svg'/>
        //             <h1>あなたへのおすすめ</h1>
        //             <p>あなたにおすすめのイベントを自動で推薦します</p>
        //             <Link href='/recommendation' passHref>
        //                 <Button>
        //                     行ってみる
        //                 </Button>
        //             </Link>
        //         </div>
        //     </div>
        // </div>
    )
}

export default Contents;