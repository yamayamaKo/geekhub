import { urlObjectKeys } from 'next/dist/next-server/lib/utils';
import {Component} from 'react'

const Introduction = () => {
    return(
        <div style={{backgroundImage: `url("../static/design_images/christin-hume-Hcfwew744z4-unsplash.jpg")`,
                    backgroundSize: 'cover'}} className="max-h-full">
        <div className="max-w-screen-xl px-8 xl:px-16 mx-auto" id="introduction"
            >
            <div className="text-center">
                <div>
                    <h1>GeekHub</h1>
                    <p>GeekHubはあなたのお気に入りのイベントを管理し、お気に入りの情報からおすすめのイベントを紹介してくれるサイトです。</p>
                </div>
            </div>
        </div>
        </div>
    )
}

export default Introduction;