import { BookQuery } from 'graphql/generated/graphql';

export type BookProps = {
  id: string;
  bookId: string;
  title: string;
  coverImageUrl: string;
  isOnSale: boolean;
  pageCount: number;
  price: number;
  rating: number | undefined | null;
  salePrice: number;
  synopsis: string;
  stock: number;
  authors: (string | null | undefined)[] | undefined;
  publisher: string | undefined | null;
  totalRatings: number | null | undefined;
};

export const bookMapper = (bookData: BookQuery) => {
  const id = bookData.book?.data?.id!;
  const {
    title,
    bookId,
    coverImageUrl,
    isOnSale,
    pageCount,
    price,
    rating,
    salePrice,
    synopsis,
    stock,
    totalRatings
  } = bookData.book?.data?.attributes!;

  if (bookData.book?.data) {
    const extractedAuthors = bookData.book?.data?.attributes?.authors?.data.map(
      (author) => author.attributes?.name
    );

    const book: BookProps = {
      id,
      bookId,
      title,
      coverImageUrl,
      isOnSale,
      pageCount,
      price,
      rating,
      salePrice,
      synopsis,
      stock,
      totalRatings,
      authors: extractedAuthors,
      publisher:
        bookData.book?.data?.attributes?.publisher?.data?.attributes?.name
    };

    return book;
  }

  return {};
};
