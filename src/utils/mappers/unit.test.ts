import { BookQuery } from 'graphql/generated/graphql';
import { bookMapper } from '.';

const mapped = {
  id: '7',
  bookId: '62312189',
  title: 'A Bear Called Paddington',
  coverImageUrl:
    'https://images-na.ssl-images-amazon.com/images/I/51clgmTURAL._SX321_BO1,204,203,200_.jpg',
  isOnSale: false,
  pageCount: 176,
  price: 45.89,
  rating: 1,
  salePrice: 0,
  synopsis:
    'Paddington Bear had just traveled all the way from Peru when the Brown family first met him in Paddington Station. Since then, their lives have never been quite the same . . . for ordinary things become extraordinary when Paddington is involved.',
  stock: 3,
  totalRatings: 10,
  authors: ['Michael Bond'],
  publisher: 'HarperCollins'
};

const data = {
  book: {
    __typename: 'BookEntityResponse',
    data: {
      __typename: 'BookEntity',
      id: '7',
      attributes: {
        __typename: 'Book',
        title: 'A Bear Called Paddington',
        bookId: '62312189',
        coverImageUrl:
          'https://images-na.ssl-images-amazon.com/images/I/51clgmTURAL._SX321_BO1,204,203,200_.jpg',
        isOnSale: false,
        pageCount: 176,
        price: 45.89,
        rating: 1,
        salePrice: 0,
        synopsis:
          'Paddington Bear had just traveled all the way from Peru when the Brown family first met him in Paddington Station. Since then, their lives have never been quite the same . . . for ordinary things become extraordinary when Paddington is involved.',
        stock: 3,
        totalRatings: 10,
        authors: {
          __typename: 'AuthorRelationResponseCollection',
          data: [
            {
              __typename: 'AuthorEntity',
              attributes: { __typename: 'Author', name: 'Michael Bond' }
            }
          ]
        },
        publisher: {
          __typename: 'PublisherEntityResponse',
          data: {
            __typename: 'PublisherEntity',
            attributes: { __typename: 'Publisher', name: 'HarperCollins' }
          }
        }
      }
    }
  }
} as BookQuery;

describe('bookMapper', () => {
  it('should return mapped book', () => {
    expect(bookMapper(data)).toStrictEqual(mapped);
  });
});
