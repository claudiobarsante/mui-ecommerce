import { UserAction } from 'components/BookRating';

export type BookUserRatings = {
  userRatings: string; //it's a JSON  received
  currentUserRating: number;
  action: UserAction;
  previousUserRating?: number;
};

export type CalculatedRating = {
  calculatedRating: number;
  updatedUserRatings: string; //it's a JSON  returned
  totalBookRatings: number;
};

type updatedUserRatings = { [key: number]: number };

function computeUserRatings({
  userRatings,
  currentUserRating,
  action,
  previousUserRating
}: BookUserRatings) {
  // -- The rating is from 1 -> 5 stars
  // -- userRating object {1: x, 2: x, 3: x, 4: x, 5: x}
  const parsedObject = JSON.parse(userRatings);

  let updatedUserRatings: updatedUserRatings = {};

  if (action === 'create') {
    updatedUserRatings = {
      ...parsedObject,
      [currentUserRating]: parsedObject[currentUserRating] + 1
    };
  }

  //to avoid computing 2 times the rate of the user - If it's an update first substract -1 of the previous rate then add the updated user rate
  if (action === 'update') {
    //remove previous rating
    updatedUserRatings = {
      ...parsedObject,
      [previousUserRating!]: parsedObject[previousUserRating!] - 1
    };
    //update with the current rating
    updatedUserRatings = {
      ...updatedUserRatings,
      [currentUserRating]: updatedUserRatings[currentUserRating] + 1
    };
  }

  return updatedUserRatings;
}

export function calculateRating({
  userRatings,
  currentUserRating,
  action,
  previousUserRating = 0
}: BookUserRatings): CalculatedRating {
  let updatedUserRatings = computeUserRatings({
    userRatings,
    currentUserRating,
    action,
    previousUserRating
  });

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

  let totalBookRatings = 0;
  for (let rating in updatedUserRatings) {
    totalBookRatings += updatedUserRatings[rating];
  }

  return {
    calculatedRating,
    updatedUserRatings: JSON.stringify(updatedUserRatings),
    totalBookRatings
  };
}
