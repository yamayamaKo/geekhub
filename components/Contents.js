import {Component} from 'react'
import Link from 'next/link'
import ContensCard from './ContensCard';

const Contents = () => {

    return(
        <div className='flex items-center justify-center bg-gray-100' id='contents'>
        <div className='px-3'>
            <div className='test-4xl sm:text-5xl text-center py-10'>
                GeekHubでできること
            </div>

            <div className='grid lg:grid-cols-4 gap-8 m-5 max-w-5xl m-auto py-5'>
                <ContensCard imgSrc='../static/icons/search.svg' linkPage='event'
                    contentName='検索'
                    content='技育祭のイベントについて検索することができます'  
                />
                <ContensCard imgSrc='../static/icons/star.svg' linkPage='favorite'
                    contentName='マイページ'
                    content='あなたがお気に入りに登録したイベントや、過去に気になったイベントについて確認することができます'  
                />
                <ContensCard imgSrc='../static/icons/questionnaire.svg' linkPage='recommendation'
                    contentName='おすすめ'
                    content='あなたにおすすめのイベントを自動で推薦します'  
                />
                <ContensCard imgSrc='../static/icons/ranking.svg' linkPage='ranking'
                    contentName='ランキング'
                    content='人気のイベントを知ることができます'  
                />        
            </div>
        </div>
        </div>
    )
}

export default Contents;