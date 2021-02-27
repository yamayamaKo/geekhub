import Link from 'next/link'

const ContensCard = (props) => {

    return(
        <div className="bg-white">
            <img src={props.imgSrc} style={{objectFit:"contain"}} alt="" className="w-full h-48 sm:h-56 object-cover" />
            <div className="h-48 px-10 py-6 mb-10 text-center">
                <div className="text-2xl font-bold text-purple-500 mb-4">{props.contentName}</div>
                <span className="text-sm">
                {props.content}
                </span>
            </div>
            <Link href={props.linkPage}>
            <button className="w-full text-lg h-16 text-white font-extrabold bg-purple-500 hover:opacity-60">やってみる</button>
            </Link>
        </div>
    )
}

export default ContensCard;