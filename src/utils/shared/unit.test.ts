import { BookUserRatings, calculateRating } from './calculate-rating';

const userRatingsMock = '{"1":17,"2":3,"3":5,"4":15,"5":34}'; //total 74 ratings
describe('calculateRating', () => {
  it('should add one rating to the book', () => {
    const params: BookUserRatings = {
      userRatings: userRatingsMock,
      currentUserRating: 5,
      action: 'create',
      previousUserRating: 0
    };
    const { calculatedRating, updatedUserRatings, totalBookRatings } =
      calculateRating(params);

    expect(totalBookRatings).toEqual(75);
    expect(updatedUserRatings).toStrictEqual(
      '{"1":17,"2":3,"3":5,"4":15,"5":35}'
    );
    expect(calculatedRating).toStrictEqual(3.64);
  });
  it('should update the user rating', () => {
    const params: BookUserRatings = {
      userRatings: userRatingsMock,
      currentUserRating: 1,
      action: 'update',
      previousUserRating: 2
    };
    const { calculatedRating, updatedUserRatings, totalBookRatings } =
      calculateRating(params);

    expect(totalBookRatings).toEqual(74);
    expect(updatedUserRatings).toStrictEqual(
      '{"1":18,"2":2,"3":5,"4":15,"5":34}'
    );
    expect(calculatedRating).toStrictEqual(3.608108108108108);
  });
  it('should not mutate the values if the previous and the current rating are the same', () => {
    const params: BookUserRatings = {
      userRatings: userRatingsMock,
      currentUserRating: 1,
      action: 'update',
      previousUserRating: 1
    };
    const { calculatedRating, updatedUserRatings, totalBookRatings } =
      calculateRating(params);
    expect(totalBookRatings).toEqual(74);
    expect(updatedUserRatings).toStrictEqual(
      '{"1":17,"2":3,"3":5,"4":15,"5":34}'
    );
    expect(calculatedRating).toStrictEqual(3.6216216216216215);
  });
});
