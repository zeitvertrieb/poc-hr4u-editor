export default function Points({data}) {
    if(data){
        return(
            <ul className='grid grid-cols- md:grid-cols-2 gap-4 list-disc list-inside'>
                {data.map((point, index) => {
                    return <li key={index}>{point}</li>
                })}
            </ul>
        )
    }
}