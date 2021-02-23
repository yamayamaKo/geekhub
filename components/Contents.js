import {Component} from 'react'

const Contents = () => {
    return(
        <div className="max-w-screen-xl mt-24 px-8 xl:px-16 mx-auto" id="contens">
            <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                    イベント検索
                </div>
                <div>
                    お気に入り
                </div>
                <div>
                    スケジュール自動設定
                </div>
            </div>
        </div>
    )
}

export default Contents;