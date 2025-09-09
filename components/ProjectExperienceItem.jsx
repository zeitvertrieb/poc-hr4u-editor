export default function ProjectExperienceItem({data}) {
    return(
        <div className="grid grid-cols-1 lg:grid-cols-3">
            <div>
                <p>{data.start} - {data.end}</p>
                <p>{data.firm}</p>
            </div>
            <div className="lg:col-span-2 flex flex-col gap-y-2">
                <h3 className="font-bold">{data.role}</h3>
                <p className="font-bold">Project Name: {data.name}</p>
                <p className="font-bold">Allgemeine Projektbeschreibung</p>
                <p>{data.description}</p>
                <p className="font-bold">Teamgröße: {data.team_size}</p>
                <p className="font-bold">Meine Aufgaben umfassen dabei:</p>
                <ul className="list-disc list-inside">
                    {data.tasks.map((task, index) => {
                        return <li key={index}>{task}</li>
                    })}
                </ul>
                <p className="font-bold">Verwendete Technologien</p>
                <ul className="list-disc list-inside">
                    {data.technologies.map((technology, index) => {
                        return <li key={index}>{technology}</li>
                    })}
                </ul>
            </div>
        </div>
    )
}