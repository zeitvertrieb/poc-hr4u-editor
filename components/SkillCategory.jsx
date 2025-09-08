import SkillSubcategory from "./SkillSubcategory";

export default function SkillCategory({category, subcategories}) {
    return(
        <div className="flex flex-col gap-4">
            <h3 className="font-zilla-slab text-xl md:text-2xl lg:text-3xl underline" >{category}</h3>
            <SkillSubcategory subcategory="UX/UI"/>
            <SkillSubcategory subcategory="Programmiersprachen"/>
        </div>
    )
}