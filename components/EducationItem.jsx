export default function EducationItem({data}) {
    return(
        <li className="flex flex-col md:grid md:grid-cols-3">
            <p>{data.start} - {data.end}</p>
            <p className="md:text-center">{data.degree}</p>
            <p className="md:text-right">{data.institution}</p>
        </li>
    )
}