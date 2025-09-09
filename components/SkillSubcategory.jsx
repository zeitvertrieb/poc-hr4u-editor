import StarRatingItem from "./StarRatingItem";

const ratingMap = {
    five: 5,
    four: 4,
    three: 3,
    two: 2,
    one: 1,
};

export default function SkillSubcategory({ data }) {
    return (
        <div>
            <h5>{data.name}</h5>
            <ul>
                {data.ratings.map((rating, index) => {
                    return Object.keys(rating).map(ratingKey => {
                        const numericRating = ratingMap[ratingKey];
                        const skills = rating[ratingKey];

                        if (numericRating) {
                            return <StarRatingItem key={index} rating={numericRating} skills={skills} />;
                        }
                        return null;
                    });
                })}
            </ul>
        </div>
    );
}