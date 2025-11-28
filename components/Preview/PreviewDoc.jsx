import Image from 'next/image'
import Profile from './Profile'
import Title from './Title'
import EducationItem from './EducationItem'
import Points from './Points'
import ExperienceItem from './ExperienceItem'
import ProjectExperienceList from './ProjectExperienceList'
import StarRatingGlossary from './StarRatingGlossary'
import SkillCategory from './SkillCategory'


export default function PreviewDoc({data}) {
    return(
        <div className="print-container align-center flex flex-col w-full lg:w-[80vw] xl:w-1/2 min-h-screen h-min bg-surface-rise lg:my-4 xl:my-8 2xl:my-16 py-4 px-8 md:py-8 md:px-12 gap-6 lg:gap-10">
             <div className="flex flex-col">
                <figure className="w-[10vw] min-w-[150px] self-end"> 
                    <Image
                        src="/images/LogoBlack.svg"
                        alt="ebcont"
                        width={125}
                        height={125}
                        layout="responsive"
                    />
                </figure>

                <h2 className="text-gray-500 font-source-sans font-extrabold text-2xl md:text-3xl lg:text-4xl border-b" >{data.first_name} <span className="uppercase">{data.last_name}</span></h2>
             </div>

             <Profile data={data}/>

            <section className='flex flex-col gap-6 lg:gap-10'>
                <Title title="Ausbildung"/>
                <ul className='flex flex-col gap-4 lg:gap-8'>
                    {data.education.map ((educationEntry, index) => {
                            return(
                                    <EducationItem key={index} data={educationEntry}/>
                                )
                    })}
                </ul>
            </section>
             
            <section className='flex flex-col gap-6 lg:gap-10'>
                <Title title="Zertifizierungen"/>
                <Points data={data.certifications}/>
            </section>
            
            <section className='flex flex-col gap-6 lg:gap-10'>
                <Title title="Fachliche Schwerpunkte"/>
                <Points data={data.professional_focus}/>
            </section>

            <section className='flex flex-col gap-6 lg:gap-10'>
                <Title title="Kernqualifikationen"/>
                <ul className='flex flex-col gap-4 lg:gap-8'>
                {data.core_qualifications.map((qualification, index) => {
                    return <ExperienceItem key={index} data={qualification}/>
                })}
                </ul>
            </section>
             
            <section className='flex flex-col gap-6 lg:gap-10'>
                <Title title="Branchenerfahrung"/>
                <ul className='flex flex-col gap-4 lg:gap-8'>
                    {data.industry_experience.map((experience, index) => {
                        return <ExperienceItem key={index} data={experience}/>
                    })}
                </ul> 
            </section>
             
            <section className='flex flex-col gap-6 lg:gap-10'>
                <Title title="Projekterfahrung"/>
                <ProjectExperienceList data={data.projects}/>
            </section>
             
            <section className='flex flex-col gap-6 lg:gap-10'>
                <Title title="Skills"/>
                <StarRatingGlossary/>
                {data.skills.map((skill_category, index) => {
                return <SkillCategory key={index} data={skill_category}/>
                })}
            </section>
             
            <section className='flex flex-col gap-6 lg:gap-10'>
                <Title title="Hobbies/Freizeit"/>
                <Points data={data.hobbies}/>
            </section>  
        </div>
    )
}