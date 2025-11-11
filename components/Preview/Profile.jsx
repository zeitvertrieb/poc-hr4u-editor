import Image from 'next/image'

export default function Profile({data}) {
    return(
        <section className="bg-gray-200 py-2 px-4 lg:py-4 lg:px-6 flex flex-col gap-4">
            <h3 className="font-bold text-lg md:text-xl lg:text-2xl mb-2">{data.role}</h3>
            <div className='flex flex-col-reverse lg:grid lg:grid-cols-3 print:grid print:grid-cols-3 gap-2 justify-items-center'>
                <dl className='md:w-1/2 lg:w-full print:w-full grid grid-cols-2 gap-x-8 col-span-2 text-xs sm:text-s md:text-lg lg:text-lg'>
                    <dt className='font-bold'>Geburtsjahr</dt>
                    <dd>{data.birthyear}</dd>
                    <dt className='font-bold'>Staatsangehörigkeit</dt>
                    <dd>{data.nationality}</dd>
                    <dt className='font-bold'>Sprachen</dt>
                    <ul>
                        {data.languages.map ((language, index) => {
                            return(
                                <li key={index}>{language.language}({language.proficiency})</li>
                            )
                        })}
                    </ul>
                </dl>
                <figure className="w-[5vw] min-w-[75px]  justify-self-end"> 
                    <Image
                        src="/images/Profile.webp"
                        alt={`Profilbild von ${data.name}`}
                        width={100}
                        height={100}
                        layout="responsive"
                        />
                </figure>
            </div>
        </section>
    )
}