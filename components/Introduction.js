import { urlObjectKeys } from 'next/dist/next-server/lib/utils';
import {Component} from 'react'

const Introduction = () => {
    return(
        <div className="bg-gray-200">
            <section className="container mx-auto py-8 px-4">
                <div className="grid lg:grid-cols-2 lg:justify-center mt-8 lg:mt-0 lg:py-32">
                    <div className="text-center ml-10 lg:text-left lg:mb-0">
                        <h2 className="mb-4 text-3xl lg:text-4xl">
                            あなただけの技育祭を、GeekHubで
                        </h2>
                        <p className="mb-6">
                            GeekHubは、エンジニアを目指す学生のためのテックカンファレンスである<a href='https://talent.supporterz.jp/geeksai/2021/'>技育祭</a>
                            での体験をより良いものにするアプリです。
                        </p>
                    </div>

                    <div className='flex justify-center lg:justify-start mx-auto lg:pl-4'>
                        <img className='rounded-lg h-auto' src='../static/design_images/tomei.jpg' width='450' height='auto' />
                        {/* <img src='../static/design_images/example-22.svg' style={{objectFit:'contain'}} width='400' height='250'/> */}
                    </div>
                </div>
            </section>
            {/* <div className='grid md:grid-cols-2 py-8 px-4'>
                <div>
                    <h1>あなただけの技育祭をGeekHubで</h1>
                    <p>
                        GeekHubは、エンジニアを目指す学生のためのテックカンファレンスである<a href='https://talent.supporterz.jp/geeksai/2021/'>技育祭</a>
                        での体験をより良いものにするアプリです。
                    </p>
                </div>

                <div className='justify-center mx-auto lg:pl-4'>
                    <img src='../static/design_images/womenTopPage.jpg' width='420' height='250' />
                </div>
            </div> */}
        </div>
    )
}

export default Introduction;