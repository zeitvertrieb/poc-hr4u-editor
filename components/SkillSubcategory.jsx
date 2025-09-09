import StarRatingItem from "./StarRatingItem";

export default function SkillSubcategory({subcategory}) {
    return(
        <div className="flex flex-col gap-2">
            <h4 className="font-medium text-lg md:text-xl lg:text-2xl" >{subcategory}</h4>
            <StarRatingItem />
            <StarRatingItem/>
        </div>
    )
}