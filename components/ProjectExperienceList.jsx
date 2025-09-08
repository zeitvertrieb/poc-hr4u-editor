import ProjectExperienceItem from "./ProjectExperienceItem";


export default function ProjectExperienceList() {
    return(
        <div className="flex flex-col gap-8">
            <div className="grid grid-cols-1 lg:grid-cols-3">
                <p className="uppercase font-bold text-primary hidden lg:block">Zeitraum</p>
                <p className="uppercase col-span-2 font-bold text-primary hidden lg:block">Aufgaben</p>
            </div>
            <ProjectExperienceItem/>
            <ProjectExperienceItem/>
        </div>
    )
}