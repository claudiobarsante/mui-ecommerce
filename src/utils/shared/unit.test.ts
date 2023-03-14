import { BookUsersRatings, calculateRating } from './calculate-rating';
import formatPrice from './format-price';

const userRatingsMock = '{"1":17,"2":3,"3":5,"4":15,"5":34}'; //total 74 ratings
describe('calculateRating', () => {
  it('should add one rating to the book', () => {
    const params: BookUsersRatings = {
      ratings: userRatingsMock,
      currentUserRating: 5,
      action: 'create',
      previousUserRating: 0
    };
    const {
      calculatedRating,
      updatedUsersRatings: updatedUserRatings,
      totalBookRatings
    } = calculateRating(params);

    expect(totalBookRatings).toEqual(75);
    expect(updatedUserRatings).toStrictEqual(
      '{"1":17,"2":3,"3":5,"4":15,"5":35}'
    );
    expect(calculatedRating).toStrictEqual(3.64);
  });
  it('should update the user rating', () => {
    const params: BookUsersRatings = {
      ratings: userRatingsMock,
      currentUserRating: 1,
      action: 'update',
      previousUserRating: 2
    };
    const {
      calculatedRating,
      updatedUsersRatings: updatedUserRatings,
      totalBookRatings
    } = calculateRating(params);

    expect(totalBookRatings).toEqual(74);
    expect(updatedUserRatings).toStrictEqual(
      '{"1":18,"2":2,"3":5,"4":15,"5":34}'
    );
    expect(calculatedRating).toStrictEqual(3.608108108108108);
  });
  it('should not mutate the values if the previous and the current rating are the same', () => {
    const params: BookUsersRatings = {
      ratings: userRatingsMock,
      currentUserRating: 1,
      action: 'update',
      previousUserRating: 1
    };
    const {
      calculatedRating,
      updatedUsersRatings: updatedUserRatings,
      totalBookRatings
    } = calculateRating(params);
    expect(totalBookRatings).toEqual(74);
    expect(updatedUserRatings).toStrictEqual(
      '{"1":17,"2":3,"3":5,"4":15,"5":34}'
    );
    expect(calculatedRating).toStrictEqual(3.6216216216216215);
  });
});

describe('formatPrice', () => {
  it('should return a formated prince in usd $, with two decimals', () => {
    const formatedPrice = formatPrice(5);
    expect(formatedPrice).toBe('$5.00');
  });
  it('should return with thousands', () => {
    const formatedPrice = formatPrice(1200);
    expect(formatedPrice).toBe('$1,200.00');
  });
});
