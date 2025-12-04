export default function ProjectExperienceItem({ data }) {
  return (
    <article className="grid grid-cols-1 lg:grid-cols-3">
      <div>
        <p>
          {data.start} - {data.end}
        </p>
        <p>{data.firm}</p>
      </div>
      <div className="lg:col-span-2 flex flex-col gap-y-2">
        <h4 className="font-bold">{data.role}</h4>
        <dl className="flex gap-1 font-bold">
          <dt>Project Name:</dt>
          <dd>{data.name}</dd>
        </dl>
        <section className="flex flex-col gap-y-2">
          <h5 className="font-bold">Allgemeine Projektbeschreibung</h5>
          <p>{data.description}</p>
        </section>
        <dl className="flex gap-1 font-bold">
          <dt>Teamgröße:</dt>
          <dd>{data.team_size}</dd>
        </dl>
        <section className="flex flex-col gap-y-2">
          <h5 className="font-bold">Meine Aufgaben umfassen dabei:</h5>
          <ul className="list-disc list-inside">
            {data.tasks.map((task, index) => {
              return <li key={index}>{task}</li>;
            })}
          </ul>
        </section>
        <section className="flex flex-col gap-y-2">
          <h5 className="font-bold">Verwendete Technologien</h5>
          <ul className="list-disc list-inside">
            {data.technologies.map((technology, index) => {
              return <li key={index}>{technology}</li>;
            })}
          </ul>
        </section>
      </div>
    </article>
  );
}
