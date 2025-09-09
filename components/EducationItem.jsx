export default function EducationItem({data}) {
    return(
        <div className="flex flex-col md:grid md:grid-cols-3">
            <p>{data.start} - {data.end}</p>
            <p className="md:text-center">{data.degree}</p>
            <p className="md:text-right">{data.institution}</p>
        </div>
    )
}