import StarRating from "./StarRating";

export default function StarRatingItem() {
    return(
        <div className="flex flex-col gap-1  md:grid md:grid-cols-5">
            <StarRating rating="5"/>
            <p className="col-span-4">Adobe InDesign (6), Adobe Suite (8), Figma</p>
        </div>
    )
}