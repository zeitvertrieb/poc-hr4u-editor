import SkillSubcategory from "./SkillSubcategory";

export default function SkillCategory({data}) {
 return(
        <div className="flex flex-col gap-4">
            <h3 className="font-zilla-slab text-xl md:text-2xl lg:text-3xl underline" >{data.category}</h3>
            {data.subcategories.map((subcategory, index) => {
                return <SkillSubcategory key={index} data={subcategory}/>
            })}
        </div>
    )
}