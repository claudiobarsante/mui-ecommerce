import { InMemoryCache } from '@apollo/client';
import { concatPagination } from '@apollo/client/utilities';

export default new InMemoryCache({
  typePolicies: {
    // Query: {
    //   fields: {

    //   }
    // },
    Book: {
      keyFields: ['sku']
    },
    Wishlist: {
      fields: {
        books: {
          merge(_, incoming) {
            return incoming;
          }
        }
      }
    },
    Rating: {
      fields: {
        tasks: {
          merge(existing = [], incoming: any[]) {
            return [...existing, ...incoming];
          }
        }
      }
    }
  }
});
