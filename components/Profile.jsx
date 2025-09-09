import Image from 'next/image'

export default function Profile({data}) {
    return(
        <div className="bg-gray-200 py-2 px-4 lg:py-4 lg:px-6 flex flex-col gap-4">
            <h2 className="font-bold text-lg md:text-xl lg:text-2xl mb-2">{data.role}</h2>
            <div className='flex flex-col-reverse lg:grid lg:grid-cols-3 gap-2 justify-items-center'>
                <div className='md:w-1/2 lg:w-full grid grid-cols-2 gap-x-8 col-span-2 text-xs sm:text-s md:text-lg lg:text-lg'>
                    <p className='font-bold'>Geburtsjahr</p>
                    <div>
                        <p>{data.birthyear}</p>
                    </div>
                     <p className='font-bold'>Staatsangehörigkeit</p>
                    <div>
                        <p>{data.nationality}</p>
                    </div>
                    <p className='font-bold'>Sprachen</p>
                    <div>
                        {data.languages.map ((language, index) => {
                            return(
                                <p key={index}>{language.language}({language.proficiency})</p>
                            )
                        })}
                    </div>
                </div>
                <div className="w-[5vw] min-w-[75px]  justify-self-end"> 
                <Image
                    src="/images/Profile.webp"
                    alt="Logo"
                    width={100}
                    height={100}
                    layout="responsive"
                    />
                </div>
            </div>
        </div>
    )
}