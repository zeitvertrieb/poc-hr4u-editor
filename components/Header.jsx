import Image from 'next/image'

export default function Header() {
    return(
        <header className="w-full h-[8vh] bg-surface-rise border-b p-2">
            <div className="relative h-full w-full flex items-center justify-start">
                <div className="w-[8vw] min-w-[125px]"> 
                                    <Image
                                        src="/images/LogoBlack.svg"
                                        alt="Logo"
                                        width={125}
                                        height={125}
                                        layout="responsive"
                                    />
                                </div>
                 <p className='hidden md:block md:text-2xl lg:text-3xl px-4 font-zilla-slab text-primary'>HR4U-Editor</p>
            </div>
        </header>
    )
}