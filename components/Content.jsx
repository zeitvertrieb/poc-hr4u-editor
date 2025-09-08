import Image from 'next/image'
import Profile from './Profile'
import Title from './Title'

export default function Content() {
    return(
        <div className="flex flex-col w-full lg:w-[80vw] xl:w-1/2 min-h-screen bg-surface-rise lg:my-4 xl:my-8 2xl:my-16 py-4 px-8 md:py-8 md:px-12 gap-6 lg:gap-10">
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

                <h1 className="text-gray-500 font-source-sans font-extrabold text-2xl md:text-3xl lg:text-4xl border-b" >Karin SCHWAB</h1>
             </div>
             <Profile/>
             <Title title="Abschnitt"/>
        </div>
    )
}