export type BookUsersRatings = {
  ratings: string; //it's a JSON  received
  currentUserRating: number;
  action: 'create' | 'update';
  previousUserRating?: number;
};

export type CalculatedRating = {
  calculatedRating: number;
  updatedUsersRatings: string; //it's a JSON  returned
  totalBookRatings: number;
};

type UpdatedUsersRatings = { [key: number]: number };

function computeUsersRatings({
  ratings,
  currentUserRating,
  action,
  previousUserRating
}: BookUsersRatings) {
  // -- The rating is from 1 -> 5 stars
  // -- userRating object {1: x, 2: x, 3: x, 4: x, 5: x}
  const parsedObject = JSON.parse(ratings);

  let updatedUsersRatings: UpdatedUsersRatings = {};

  if (action === 'create') {
    updatedUsersRatings = {
      ...parsedObject,
      [currentUserRating]: parsedObject[currentUserRating] + 1
    };
  }

  //to avoid computing 2 times the rate of the user - If it's an update first substract -1 of the previous rate then add the updated user rate
  if (action === 'update') {
    //remove previous rating
    updatedUsersRatings = {
      ...parsedObject,
      [previousUserRating!]: parsedObject[previousUserRating!] - 1
    };
    //update with the current rating
    updatedUsersRatings = {
      ...updatedUsersRatings,
      [currentUserRating]: updatedUsersRatings[currentUserRating] + 1
    };
  }

  return updatedUsersRatings;
}

export function calculateRating({
  ratings,
  currentUserRating,
  action,
  previousUserRating = 0
}: BookUsersRatings): CalculatedRating {
  let updatedUsersRatings = computeUsersRatings({
    ratings,
    currentUserRating,
    action,
    previousUserRating
  });

  //?Using a weighted average, where you weigh each rating with the number of votes it got
  const calculatedRating =
    (1 * updatedUsersRatings[1] +
      2 * updatedUsersRatings[2] +
      3 * updatedUsersRatings[3] +
      4 * updatedUsersRatings[4] +
      5 * updatedUsersRatings[5]) /
    (updatedUsersRatings[1] +
      updatedUsersRatings[2] +
      updatedUsersRatings[3] +
      updatedUsersRatings[4] +
      updatedUsersRatings[5]);

  let totalBookRatings = 0;
  for (let rating in updatedUsersRatings) {
    totalBookRatings += updatedUsersRatings[rating];
  }

  return {
    calculatedRating,
    updatedUsersRatings: JSON.stringify(updatedUsersRatings),
    totalBookRatings
  };
}
