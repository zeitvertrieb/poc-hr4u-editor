export default function ExperienceItem({data}) {
    return(
        <div className="flex flex-col md:flex-row md:justify-between">
            <div>
                <p>{data.name}</p>
               {data.points && <p>({data.points} Projecterfahrung)</p>}
            </div>
            <p>
                {data.years && <span>{data.years} Jahre</span>}
                {data.years && (data.months || data.level) && ', '}
                {data.months && <span>{data.months} Monate</span>}
                {data.level && <span>{data.level}</span>}
            </p>
        </div>
    )
}