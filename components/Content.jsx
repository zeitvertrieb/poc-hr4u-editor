import Image from 'next/image'
import Profile from './Profile'

export default function Content() {
    return(
        <div className="flex flex-col w-full xl:w-[50vw] min-h-screen bg-surface-rise xl:my-8 2xl:my-16 py-4 px-8 md:py-8 md:px-12 gap-6 lg:gap-10">
             <div className="flex flex-col">
                <div className="w-[10vw] min-w-[150px] self-end"> 
                    <Image
                        src="/images/LogoBlack.svg"
                        alt="Logo"
                        width={125}
                        height={125}
                        layout="responsive"
                    />
                </div>

                <h1 className="text-gray-500 font-source-sans font-extrabold text-xl md:text-3xl lg:text-4xl border-b" >Karin Schwab</h1>
                <Profile/>
             </div>
        </div>
    )
}