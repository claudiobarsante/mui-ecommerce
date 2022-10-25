export type UserRatings = {
  userRatings: string; //it's a JSON  received
  currentUserRating: number;
};

export type CalculatedRating = {
  calculatedRating: number;
  updatedUserRatings: string; //it's a JSON  returned
};

export function calculateRating({
  userRatings,
  currentUserRating
}: UserRatings): CalculatedRating {
  // -- The rating is from 1 -> 5 stars
  // -- userRating object {1: x, 2: x, 3: x, 4: x, 5: x}
  const parsedObject = JSON.parse(userRatings);
  console.log('parsedObject', parsedObject);
  const updatedUserRatings = {
    ...parsedObject,
    [currentUserRating]: parsedObject[currentUserRating] + 1
  };

  //?Using a weighted average, where you weigh each rating with the number of votes it got
  const calculatedRating =
    (1 * updatedUserRatings[1] +
      2 * updatedUserRatings[2] +
      3 * updatedUserRatings[3] +
      4 * updatedUserRatings[4] +
      5 * updatedUserRatings[5]) /
    (updatedUserRatings[1] +
      updatedUserRatings[2] +
      updatedUserRatings[3] +
      updatedUserRatings[4] +
      updatedUserRatings[5]);

  return {
    calculatedRating,
    updatedUserRatings: JSON.stringify(updatedUserRatings)
  };
}
