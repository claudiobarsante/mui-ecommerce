import { BookQuery } from 'graphql/generated/graphql';

export type BookProps = {
  id: string;
  title: string | undefined | null;
  coverImageUrl: string | undefined | null;
  isOnSale: boolean | undefined | null;
  pageCount: number | undefined | null;
  price: number | undefined | null;
  rating: number | undefined | null;
  salePrice: number | undefined | null;
  synopsis: string | undefined | null;
  authors: (string | null | undefined)[] | undefined;
  publisher: string | undefined | null;
};

export const bookMapper = (bookData: BookQuery) => {
  console.log('dentro do mapper', bookData);
  const id = bookData.book?.data?.id!;
  const {
    title,
    coverImageUrl,
    isOnSale,
    pageCount,
    price,
    rating,
    salePrice,
    synopsis
  } = bookData.book?.data?.attributes!;

  if (bookData.book?.data) {
    const extractedAuthors = bookData.book?.data?.attributes?.authors?.data.map(
      (author) => author.attributes?.name
    );

    const book: BookProps = {
      id,
      title,
      coverImageUrl,
      isOnSale,
      pageCount,
      price,
      rating,
      salePrice,
      synopsis,
      authors: extractedAuthors,
      publisher:
        bookData.book?.data?.attributes?.publisher?.data?.attributes?.name
    };

    console.log('fim do mapper book->', book);
    return book;
  }

  return {};
};
