import Image from 'next/image'
import Profile from './Profile'
import Title from './Title'
import EducationItem from './EducationItem'
import Points from './Points'
import ExperienceItem from './ExperienceItem'
import ProjectExperienceList from './ProjectExperienceList'
import StarRatingGlossary from './StarRatingGlossary'
import SkillCategory from './SkillCategory'

export default async function Content({data}) {
    return(
        <div className="flex flex-col w-full lg:w-[80vw] xl:w-1/2 min-h-screen bg-surface-rise lg:my-4 xl:my-8 2xl:my-16 py-4 px-8 md:py-8 md:px-12 gap-6 lg:gap-10">
             <div className="flex flex-col">
                <div className="w-[10vw] min-w-[150px] self-end"> 
                    <Image
                        src="/images/LogoBlack.svg"
                        alt="Logo"
                        width={125}
                        height={125}
                        layout="responsive"
                    />
                </div>

                <h1 className="text-gray-500 font-source-sans font-extrabold text-2xl md:text-3xl lg:text-4xl border-b" >Karin <span className="uppercase">Schwab</span></h1>
             </div>

             <Profile/>

             <Title title="Ausbildung"/>
            <div className='flex flex-col gap-4 lg:gap-8'>
                <EducationItem/>
                <EducationItem/>
            </div>

             <Title title="Zertifizierungen"/>
            <Points/>
            
             <Title title="Fachliche Schwerpunkte"/>
            <ul className='grid grid-cols- md:grid-cols-2 gap-4 list-disc list-inside'>
                <li>Durchführung von Benutzerforschung und -analysen, um die Bedürfnisse und Verhaltensweisen der Nutzer:innen zu verstehen</li>
                <li>Durchführung von Benutzerforschung und -analysen, um die Bedürfnisse und Verhaltensweisen der Nutzer:innen zu verstehen</li>
                <li>Durchführung von Benutzerforschung und -analysen, um die Bedürfnisse und Verhaltensweisen der Nutzer:innen zu verstehen</li>
            </ul>

             <Title title="Kernqualifikationen"/>
             <div className='flex flex-col gap-4 lg:gap-8'>
                <ExperienceItem/>
                <ExperienceItem/>
            </div>

             <Title title="Branchenerfahrung"/>
             <div className='flex flex-col gap-4 lg:gap-8'>
                <ExperienceItem/>
                <ExperienceItem/>
            </div>

             <Title title="Projekterfahrung"/>
            <ProjectExperienceList/>

             <Title title="Skills"/>
             <StarRatingGlossary/>
             <SkillCategory category="IT-Skills" subcategories=""/>

             <Title title="Hobbies/Freizeit"/>
              <Points/>
        </div>
    )
}