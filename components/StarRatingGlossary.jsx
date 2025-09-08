import StarRating from "./StarRating";

export default function StarRatingGlossary() {
    return(
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-2">
            <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
                <StarRating rating="5"/>
                <p className="">Ausgezeichnet</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:tems-center">
                <StarRating rating="4"/>
                <p className="">Sehr Gut</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
                <StarRating rating="3"/>
                <p className="">Gut</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
                <StarRating rating="2"/>
                <p className="">Grundkenntnisse</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
                <StarRating rating="1"/>
                <p className="">Theorie</p>
            </div>
            <p>Zahlen in Klammern = Jahre Erfahrung</p>
        </div>
    )
}