import {
  CREATE_WISHLIST_MUTATION,
  UPDATE_WISHLIST_MUTATION
} from 'graphql/mutations/wishlist';
import { WISHLISTS_QUERY } from 'graphql/queries/wishlist';

const MOCK_USER_ID: string = '1';
const MOCK_WISHLIST_ID: string = '25';
const MOCK_BOOK_ID: string = '8';

export const wishlistMock = {
  request: {
    query: WISHLISTS_QUERY,
    context: { session: { jwt: '123' } },
    variables: {
      userId: MOCK_USER_ID
    }
  },
  result: {
    data: {
      wishlists: {
        __typename: 'WishlistEntityResponseCollection',
        data: [
          {
            __typename: 'WishlistEntity',
            id: MOCK_WISHLIST_ID,
            attributes: {
              __typename: 'Wishlist',
              user: {
                __typename: 'UsersPermissionsUserEntityResponse',
                data: {
                  __typename: 'UsersPermissionsUserEntity',
                  id: MOCK_USER_ID
                }
              },
              books: {
                __typename: 'BookRelationResponseCollection',
                data: [
                  {
                    __typename: 'BookEntity',
                    id: '2',
                    attributes: {
                      __typename: 'Book',
                      title: 'Voice of War',
                      sku: '123333',
                      coverImageUrl:
                        'https://images-na.ssl-images-amazon.com/images/I/41JodZ5Vl%2BL.jpg',
                      isOnSale: false,
                      pageCount: 372,
                      userRatings: '{"1":3,"2":0,"3":0,"4":0,"5":4}',
                      price: 34.78,
                      rating: 3.2857142857142856,
                      salePrice: 0,
                      synopsis:
                        "Chrys Valerian is a threadweaver, a high general, and soon-to-be father. But to the people of Alchea, he is the Apogee—the man who won the war.\\n\\nWhen a stranger's prophecy foretells danger to Chrys' child, he must do everything in his power to protect his family—even if the most dangerous enemy is the voice in his own head.\\n\\nTo the west, a sheltered girl seeks to find her place in the world.\\n\\nTo the south, a young man's life changes after he dies.\\n\\nTogether, they will change the world—whether they intend to or not",
                      stock: 1,
                      totalRatings: 0,
                      authors: {
                        __typename: 'AuthorRelationResponseCollection',
                        data: [
                          {
                            __typename: 'AuthorEntity',
                            attributes: {
                              __typename: 'Author',
                              name: 'Zack Argyle'
                            }
                          }
                        ]
                      },
                      publisher: {
                        __typename: 'PublisherEntityResponse',
                        data: {
                          __typename: 'PublisherEntity',
                          attributes: {
                            __typename: 'Publisher',
                            name: 'Self Published'
                          }
                        }
                      }
                    }
                  },
                  {
                    __typename: 'BookEntity',
                    id: '3',
                    attributes: {
                      __typename: 'Book',
                      title: 'How to Be an Antiracist',
                      sku: 'uiuiuiuiui',
                      coverImageUrl:
                        'https://images-na.ssl-images-amazon.com/images/I/51JM3rldZCL._SX329_BO1,204,203,200_.jpg',
                      isOnSale: false,
                      pageCount: 320,
                      userRatings: null,
                      price: 78.9,
                      rating: 2,
                      salePrice: 0,
                      synopsis:
                        'Antiracism is a transformative concept that reorients and reenergizes the conversation about racism—and, even more fundamentally, points us toward liberating new ways of thinking about ourselves and each other. At its core, racism is a powerful system that creates false hierarchies of human value; its warped logic extends beyond race, from the way we regard people of different ethnicities or skin colors to the way we treat people of different sexes, gender identities, and body types. Racism intersects with class and culture and geography and even changes the way we see and value ourselves. In How to Be an Antiracist, Kendi takes readers through a widening circle of antiracist ideas—from the most basic concepts to visionary possibilities—that will help readers see all forms of racism clearly, understand their poisonous consequences, and work to oppose them in our systems and in ourselves.\\n\\nKendi weaves an electrifying combination of ethics, history, law, and science with his own personal story of awakening to antiracism. This is an essential work for anyone who wants to go beyond the awareness of racism to the next step: contributing to the formation of a just and equitable society.\n  ',
                      stock: 6,
                      totalRatings: 0,
                      authors: {
                        __typename: 'AuthorRelationResponseCollection',
                        data: [
                          {
                            __typename: 'AuthorEntity',
                            attributes: {
                              __typename: 'Author',
                              name: 'Leo Tolstoy'
                            }
                          }
                        ]
                      },
                      publisher: {
                        __typename: 'PublisherEntityResponse',
                        data: {
                          __typename: 'PublisherEntity',
                          attributes: {
                            __typename: 'Publisher',
                            name: 'One World'
                          }
                        }
                      }
                    }
                  }
                ]
              }
            }
          }
        ]
      }
    }
  }
};

export const createWishlistMock = {
  request: {
    query: CREATE_WISHLIST_MUTATION,
    context: { session: { jwt: '123' } },
    variables: {
      data: {
        user: MOCK_USER_ID,
        books: [MOCK_BOOK_ID]
      }
    }
  },
  result: {
    data: {
      createWishlist: {
        data: {
          id: MOCK_WISHLIST_ID,
          attributes: {
            user: {
              data: {
                id: MOCK_USER_ID,
                __typename: 'UsersPermissionsUserEntity'
              },
              __typename: 'UsersPermissionsUserEntityResponse'
            },
            books: {
              data: [
                {
                  id: MOCK_BOOK_ID,
                  attributes: {
                    title: 'A Gentleman in Moscow',
                    sku: '12345',
                    coverImageUrl:
                      'https://images-na.ssl-images-amazon.com/images/I/51NricjmP4L._SX324_BO1,204,203,200_.jpg',
                    isOnSale: false,
                    pageCount: 496,
                    userRatings: '{"1":0,"2":1,"3":0,"4":0,"5":0}',
                    price: 23.67,
                    rating: 2,
                    salePrice: 0,
                    synopsis:
                      'In 1922, Count Alexander Rostov is deemed an unrepentant aristocrat by a Bolshevik tribunal, and is sentenced to house arrest in the Metropol, a grand hotel across the street from the Kremlin. Rostov, an indomitable man of erudition and wit, has never worked a day in his life, and must now live in an attic room while some of the most tumultuous decades in Russian history are unfolding outside the hotel’s doors. Unexpectedly, his reduced circumstances provide him entry into a much larger world of emotional discovery.',
                    stock: 10,
                    totalRatings: 1,
                    authors: {
                      data: [
                        {
                          attributes: {
                            name: 'Amor Towles',
                            __typename: 'Author'
                          },
                          __typename: 'AuthorEntity'
                        }
                      ],
                      __typename: 'AuthorRelationResponseCollection'
                    },
                    publisher: {
                      data: {
                        attributes: {
                          name: 'Penguin Books',
                          __typename: 'Publisher'
                        },
                        __typename: 'PublisherEntity'
                      },
                      __typename: 'PublisherEntityResponse'
                    },
                    __typename: 'Book'
                  },
                  __typename: 'BookEntity'
                }
              ],
              __typename: 'BookRelationResponseCollection'
            },
            __typename: 'Wishlist'
          },
          __typename: 'WishlistEntity'
        },
        __typename: 'WishlistEntityResponse'
      }
    }
  }
};

export const updateWishlistMock = {
  request: {
    query: UPDATE_WISHLIST_MUTATION,
    context: { session: { jwt: '123' } },
    variables: {
      id: MOCK_WISHLIST_ID,
      data: {
        user: MOCK_USER_ID,
        books: ['2', '3', '8']
      }
    }
  },
  result: {
    data: {
      updateWishlist: {
        data: {
          id: MOCK_WISHLIST_ID,
          attributes: {
            user: {
              data: {
                id: MOCK_USER_ID,
                __typename: 'UsersPermissionsUserEntity'
              },
              __typename: 'UsersPermissionsUserEntityResponse'
            },
            books: {
              data: [
                {
                  id: '2',
                  attributes: {
                    title: 'Voice of War',
                    sku: '123333',
                    coverImageUrl:
                      'https://images-na.ssl-images-amazon.com/images/I/41JodZ5Vl%2BL.jpg',
                    isOnSale: false,
                    pageCount: 372,
                    userRatings: '{"1":3,"2":0,"3":0,"4":0,"5":4}',
                    price: 34.78,
                    rating: 3.2857142857142856,
                    salePrice: 0,
                    synopsis:
                      "Chrys Valerian is a threadweaver, a high general, and soon-to-be father. But to the people of Alchea, he is the Apogee—the man who won the war.\\n\\nWhen a stranger's prophecy foretells danger to Chrys' child, he must do everything in his power to protect his family—even if the most dangerous enemy is the voice in his own head.\\n\\nTo the west, a sheltered girl seeks to find her place in the world.\\n\\nTo the south, a young man's life changes after he dies.\\n\\nTogether, they will change the world—whether they intend to or not",
                    stock: 1,
                    totalRatings: 0,
                    authors: {
                      data: [
                        {
                          attributes: {
                            name: 'Zack Argyle',
                            __typename: 'Author'
                          },
                          __typename: 'AuthorEntity'
                        }
                      ],
                      __typename: 'AuthorRelationResponseCollection'
                    },
                    publisher: {
                      data: {
                        attributes: {
                          name: 'Self Published',
                          __typename: 'Publisher'
                        },
                        __typename: 'PublisherEntity'
                      },
                      __typename: 'PublisherEntityResponse'
                    },
                    __typename: 'Book'
                  },
                  __typename: 'BookEntity'
                },
                {
                  id: '3',
                  attributes: {
                    title: 'How to Be an Antiracist',
                    sku: 'uiuiuiuiui',
                    coverImageUrl:
                      'https://images-na.ssl-images-amazon.com/images/I/51JM3rldZCL._SX329_BO1,204,203,200_.jpg',
                    isOnSale: false,
                    pageCount: 320,
                    userRatings: null,
                    price: 78.9,
                    rating: 2,
                    salePrice: 0,
                    synopsis:
                      'Antiracism is a transformative concept that reorients and reenergizes the conversation about racism—and, even more fundamentally, points us toward liberating new ways of thinking about ourselves and each other. At its core, racism is a powerful system that creates false hierarchies of human value; its warped logic extends beyond race, from the way we regard people of different ethnicities or skin colors to the way we treat people of different sexes, gender identities, and body types. Racism intersects with class and culture and geography and even changes the way we see and value ourselves. In How to Be an Antiracist, Kendi takes readers through a widening circle of antiracist ideas—from the most basic concepts to visionary possibilities—that will help readers see all forms of racism clearly, understand their poisonous consequences, and work to oppose them in our systems and in ourselves.\\n\\nKendi weaves an electrifying combination of ethics, history, law, and science with his own personal story of awakening to antiracism. This is an essential work for anyone who wants to go beyond the awareness of racism to the next step: contributing to the formation of a just and equitable society.\n  ',
                    stock: 6,
                    totalRatings: 0,
                    authors: {
                      data: [
                        {
                          attributes: {
                            name: 'Leo Tolstoy',
                            __typename: 'Author'
                          },
                          __typename: 'AuthorEntity'
                        }
                      ],
                      __typename: 'AuthorRelationResponseCollection'
                    },
                    publisher: {
                      data: {
                        attributes: {
                          name: 'One World',
                          __typename: 'Publisher'
                        },
                        __typename: 'PublisherEntity'
                      },
                      __typename: 'PublisherEntityResponse'
                    },
                    __typename: 'Book'
                  },
                  __typename: 'BookEntity'
                },
                {
                  id: '8',
                  attributes: {
                    title: 'A Gentleman in Moscow',
                    sku: '12345',
                    coverImageUrl:
                      'https://images-na.ssl-images-amazon.com/images/I/51NricjmP4L._SX324_BO1,204,203,200_.jpg',
                    isOnSale: false,
                    pageCount: 496,
                    userRatings: '{"1":0,"2":1,"3":0,"4":0,"5":0}',
                    price: 23.67,
                    rating: 2,
                    salePrice: 0,
                    synopsis:
                      'In 1922, Count Alexander Rostov is deemed an unrepentant aristocrat by a Bolshevik tribunal, and is sentenced to house arrest in the Metropol, a grand hotel across the street from the Kremlin. Rostov, an indomitable man of erudition and wit, has never worked a day in his life, and must now live in an attic room while some of the most tumultuous decades in Russian history are unfolding outside the hotel’s doors. Unexpectedly, his reduced circumstances provide him entry into a much larger world of emotional discovery.',
                    stock: 10,
                    totalRatings: 1,
                    authors: {
                      data: [
                        {
                          attributes: {
                            name: 'Amor Towles',
                            __typename: 'Author'
                          },
                          __typename: 'AuthorEntity'
                        }
                      ],
                      __typename: 'AuthorRelationResponseCollection'
                    },
                    publisher: {
                      data: {
                        attributes: {
                          name: 'Penguin Books',
                          __typename: 'Publisher'
                        },
                        __typename: 'PublisherEntity'
                      },
                      __typename: 'PublisherEntityResponse'
                    },
                    __typename: 'Book'
                  },
                  __typename: 'BookEntity'
                }
              ],
              __typename: 'BookRelationResponseCollection'
            },
            __typename: 'Wishlist'
          },
          __typename: 'WishlistEntity'
        },
        __typename: 'WishlistEntityResponse'
      }
    }
  }
};

export const removeWishlistMock = {
  request: {
    query: UPDATE_WISHLIST_MUTATION,
    context: { session: { jwt: '123' } },
    variables: {
      id: MOCK_WISHLIST_ID,
      data: {
        user: MOCK_USER_ID,
        books: ['2']
      }
    }
  },
  result: {
    data: {
      updateWishlist: {
        data: {
          id: MOCK_WISHLIST_ID,
          attributes: {
            user: {
              data: {
                id: MOCK_USER_ID,
                __typename: 'UsersPermissionsUserEntity'
              },
              __typename: 'UsersPermissionsUserEntityResponse'
            },
            books: {
              data: [
                {
                  id: '2',
                  attributes: {
                    title: 'Voice of War',
                    sku: '123333',
                    coverImageUrl:
                      'https://images-na.ssl-images-amazon.com/images/I/41JodZ5Vl%2BL.jpg',
                    isOnSale: false,
                    pageCount: 372,
                    userRatings: '{"1":3,"2":0,"3":0,"4":0,"5":4}',
                    price: 34.78,
                    rating: 3.2857142857142856,
                    salePrice: 0,
                    synopsis:
                      "Chrys Valerian is a threadweaver, a high general, and soon-to-be father. But to the people of Alchea, he is the Apogee—the man who won the war.\\n\\nWhen a stranger's prophecy foretells danger to Chrys' child, he must do everything in his power to protect his family—even if the most dangerous enemy is the voice in his own head.\\n\\nTo the west, a sheltered girl seeks to find her place in the world.\\n\\nTo the south, a young man's life changes after he dies.\\n\\nTogether, they will change the world—whether they intend to or not",
                    stock: 1,
                    totalRatings: 0,
                    authors: {
                      data: [
                        {
                          attributes: {
                            name: 'Zack Argyle',
                            __typename: 'Author'
                          },
                          __typename: 'AuthorEntity'
                        }
                      ],
                      __typename: 'AuthorRelationResponseCollection'
                    },
                    publisher: {
                      data: {
                        attributes: {
                          name: 'Self Published',
                          __typename: 'Publisher'
                        },
                        __typename: 'PublisherEntity'
                      },
                      __typename: 'PublisherEntityResponse'
                    },
                    __typename: 'Book'
                  },
                  __typename: 'BookEntity'
                }
              ],
              __typename: 'BookRelationResponseCollection'
            },
            __typename: 'Wishlist'
          },
          __typename: 'WishlistEntity'
        },
        __typename: 'WishlistEntityResponse'
      }
    }
  }
};

export const wishlistItems = [
  {
    id: '2',
    sku: '123333',
    title: 'Voice of War',
    coverImageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/41JodZ5Vl%2BL.jpg',
    isOnSale: false,
    pageCount: 372,
    price: 34.78,
    rating: 3.2857142857142856,
    salePrice: 0,
    synopsis:
      "Chrys Valerian is a threadweaver, a high general, and soon-to-be father. But to the people of Alchea, he is the Apogee—the man who won the war.\\n\\nWhen a stranger's prophecy foretells danger to Chrys' child, he must do everything in his power to protect his family—even if the most dangerous enemy is the voice in his own head.\\n\\nTo the west, a sheltered girl seeks to find her place in the world.\\n\\nTo the south, a young man's life changes after he dies.\\n\\nTogether, they will change the world—whether they intend to or not",
    stock: 1,
    totalRatings: 0,
    authors: ['Zack Argyle'],
    publisher: 'Self Published'
  },
  {
    id: '3',
    sku: 'uiuiuiuiui',
    title: 'How to Be an Antiracist',
    coverImageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/51JM3rldZCL._SX329_BO1,204,203,200_.jpg',
    isOnSale: false,
    pageCount: 320,
    price: 78.9,
    rating: 2,
    salePrice: 0,
    synopsis:
      'Antiracism is a transformative concept that reorients and reenergizes the conversation about racism—and, even more fundamentally, points us toward liberating new ways of thinking about ourselves and each other. At its core, racism is a powerful system that creates false hierarchies of human value; its warped logic extends beyond race, from the way we regard people of different ethnicities or skin colors to the way we treat people of different sexes, gender identities, and body types. Racism intersects with class and culture and geography and even changes the way we see and value ourselves. In How to Be an Antiracist, Kendi takes readers through a widening circle of antiracist ideas—from the most basic concepts to visionary possibilities—that will help readers see all forms of racism clearly, understand their poisonous consequences, and work to oppose them in our systems and in ourselves.\\n\\nKendi weaves an electrifying combination of ethics, history, law, and science with his own personal story of awakening to antiracism. This is an essential work for anyone who wants to go beyond the awareness of racism to the next step: contributing to the formation of a just and equitable society.\n  ',
    stock: 6,
    totalRatings: 0,
    authors: ['Leo Tolstoy'],
    publisher: 'One World'
  },
  {
    id: '8',
    sku: '12345',
    title: 'A Gentleman in Moscow',
    coverImageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/51NricjmP4L._SX324_BO1,204,203,200_.jpg',
    isOnSale: false,
    pageCount: 496,
    price: 23.67,
    rating: 2,
    salePrice: 0,
    synopsis:
      'In 1922, Count Alexander Rostov is deemed an unrepentant aristocrat by a Bolshevik tribunal, and is sentenced to house arrest in the Metropol, a grand hotel across the street from the Kremlin. Rostov, an indomitable man of erudition and wit, has never worked a day in his life, and must now live in an attic room while some of the most tumultuous decades in Russian history are unfolding outside the hotel’s doors. Unexpectedly, his reduced circumstances provide him entry into a much larger world of emotional discovery.',
    stock: 10,
    totalRatings: 1,
    authors: ['Amor Towles'],
    publisher: 'Penguin Books'
  }
];
