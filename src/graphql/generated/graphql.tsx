import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  JSON: any;
  Upload: any;
};

export type Author = {
  __typename?: 'Author';
  books?: Maybe<BookRelationResponseCollection>;
  createdAt?: Maybe<Scalars['DateTime']>;
  name?: Maybe<Scalars['String']>;
  publishedAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type AuthorBooksArgs = {
  filters?: InputMaybe<BookFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type AuthorEntity = {
  __typename?: 'AuthorEntity';
  attributes?: Maybe<Author>;
  id?: Maybe<Scalars['ID']>;
};

export type AuthorEntityResponse = {
  __typename?: 'AuthorEntityResponse';
  data?: Maybe<AuthorEntity>;
};

export type AuthorEntityResponseCollection = {
  __typename?: 'AuthorEntityResponseCollection';
  data: Array<AuthorEntity>;
  meta: ResponseCollectionMeta;
};

export type AuthorFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<AuthorFiltersInput>>>;
  books?: InputMaybe<BookFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<AuthorFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<AuthorFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type AuthorInput = {
  books?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  name?: InputMaybe<Scalars['String']>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
};

export type AuthorRelationResponseCollection = {
  __typename?: 'AuthorRelationResponseCollection';
  data: Array<AuthorEntity>;
};

export type Book = {
  __typename?: 'Book';
  authors?: Maybe<AuthorRelationResponseCollection>;
  category?: Maybe<CategoryEntityResponse>;
  coverImageUrl: Scalars['String'];
  createdAt?: Maybe<Scalars['DateTime']>;
  isFeatured: Scalars['Boolean'];
  isOnSale: Scalars['Boolean'];
  pageCount: Scalars['Int'];
  price: Scalars['Float'];
  publishedAt?: Maybe<Scalars['DateTime']>;
  publisher?: Maybe<PublisherEntityResponse>;
  rating?: Maybe<Scalars['Float']>;
  salePrice: Scalars['Float'];
  sku: Scalars['String'];
  stock: Scalars['Int'];
  synopsis: Scalars['String'];
  title: Scalars['String'];
  totalRatings?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  userRatings?: Maybe<Scalars['JSON']>;
};


export type BookAuthorsArgs = {
  filters?: InputMaybe<AuthorFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type BookEntity = {
  __typename?: 'BookEntity';
  attributes?: Maybe<Book>;
  id?: Maybe<Scalars['ID']>;
};

export type BookEntityResponse = {
  __typename?: 'BookEntityResponse';
  data?: Maybe<BookEntity>;
};

export type BookEntityResponseCollection = {
  __typename?: 'BookEntityResponseCollection';
  data: Array<BookEntity>;
  meta: ResponseCollectionMeta;
};

export type BookFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<BookFiltersInput>>>;
  authors?: InputMaybe<AuthorFiltersInput>;
  category?: InputMaybe<CategoryFiltersInput>;
  coverImageUrl?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  isFeatured?: InputMaybe<BooleanFilterInput>;
  isOnSale?: InputMaybe<BooleanFilterInput>;
  not?: InputMaybe<BookFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<BookFiltersInput>>>;
  pageCount?: InputMaybe<IntFilterInput>;
  price?: InputMaybe<FloatFilterInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  publisher?: InputMaybe<PublisherFiltersInput>;
  rating?: InputMaybe<FloatFilterInput>;
  salePrice?: InputMaybe<FloatFilterInput>;
  sku?: InputMaybe<StringFilterInput>;
  stock?: InputMaybe<IntFilterInput>;
  synopsis?: InputMaybe<StringFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  totalRatings?: InputMaybe<IntFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  userRatings?: InputMaybe<JsonFilterInput>;
};

export type BookInput = {
  authors?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  category?: InputMaybe<Scalars['ID']>;
  coverImageUrl?: InputMaybe<Scalars['String']>;
  isFeatured?: InputMaybe<Scalars['Boolean']>;
  isOnSale?: InputMaybe<Scalars['Boolean']>;
  pageCount?: InputMaybe<Scalars['Int']>;
  price?: InputMaybe<Scalars['Float']>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  publisher?: InputMaybe<Scalars['ID']>;
  rating?: InputMaybe<Scalars['Float']>;
  salePrice?: InputMaybe<Scalars['Float']>;
  sku?: InputMaybe<Scalars['String']>;
  stock?: InputMaybe<Scalars['Int']>;
  synopsis?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  totalRatings?: InputMaybe<Scalars['Int']>;
  userRatings?: InputMaybe<Scalars['JSON']>;
};

export type BookRelationResponseCollection = {
  __typename?: 'BookRelationResponseCollection';
  data: Array<BookEntity>;
};

export type BooleanFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  contains?: InputMaybe<Scalars['Boolean']>;
  containsi?: InputMaybe<Scalars['Boolean']>;
  endsWith?: InputMaybe<Scalars['Boolean']>;
  eq?: InputMaybe<Scalars['Boolean']>;
  eqi?: InputMaybe<Scalars['Boolean']>;
  gt?: InputMaybe<Scalars['Boolean']>;
  gte?: InputMaybe<Scalars['Boolean']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  lt?: InputMaybe<Scalars['Boolean']>;
  lte?: InputMaybe<Scalars['Boolean']>;
  ne?: InputMaybe<Scalars['Boolean']>;
  not?: InputMaybe<BooleanFilterInput>;
  notContains?: InputMaybe<Scalars['Boolean']>;
  notContainsi?: InputMaybe<Scalars['Boolean']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  startsWith?: InputMaybe<Scalars['Boolean']>;
};

export type Category = {
  __typename?: 'Category';
  createdAt?: Maybe<Scalars['DateTime']>;
  name: Scalars['String'];
  publishedAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type CategoryEntity = {
  __typename?: 'CategoryEntity';
  attributes?: Maybe<Category>;
  id?: Maybe<Scalars['ID']>;
};

export type CategoryEntityResponse = {
  __typename?: 'CategoryEntityResponse';
  data?: Maybe<CategoryEntity>;
};

export type CategoryEntityResponseCollection = {
  __typename?: 'CategoryEntityResponseCollection';
  data: Array<CategoryEntity>;
  meta: ResponseCollectionMeta;
};

export type CategoryFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<CategoryFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<CategoryFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<CategoryFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type CategoryInput = {
  name?: InputMaybe<Scalars['String']>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
};

export type DateTimeFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  contains?: InputMaybe<Scalars['DateTime']>;
  containsi?: InputMaybe<Scalars['DateTime']>;
  endsWith?: InputMaybe<Scalars['DateTime']>;
  eq?: InputMaybe<Scalars['DateTime']>;
  eqi?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  ne?: InputMaybe<Scalars['DateTime']>;
  not?: InputMaybe<DateTimeFilterInput>;
  notContains?: InputMaybe<Scalars['DateTime']>;
  notContainsi?: InputMaybe<Scalars['DateTime']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  startsWith?: InputMaybe<Scalars['DateTime']>;
};

export type FileInfoInput = {
  alternativeText?: InputMaybe<Scalars['String']>;
  caption?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type FloatFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  contains?: InputMaybe<Scalars['Float']>;
  containsi?: InputMaybe<Scalars['Float']>;
  endsWith?: InputMaybe<Scalars['Float']>;
  eq?: InputMaybe<Scalars['Float']>;
  eqi?: InputMaybe<Scalars['Float']>;
  gt?: InputMaybe<Scalars['Float']>;
  gte?: InputMaybe<Scalars['Float']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  lt?: InputMaybe<Scalars['Float']>;
  lte?: InputMaybe<Scalars['Float']>;
  ne?: InputMaybe<Scalars['Float']>;
  not?: InputMaybe<FloatFilterInput>;
  notContains?: InputMaybe<Scalars['Float']>;
  notContainsi?: InputMaybe<Scalars['Float']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  startsWith?: InputMaybe<Scalars['Float']>;
};

export type GenericMorph = Author | Book | Category | I18NLocale | Publisher | Rating | UploadFile | UploadFolder | UsersPermissionsPermission | UsersPermissionsRole | UsersPermissionsUser | Wishlist;

export type I18NLocale = {
  __typename?: 'I18NLocale';
  code?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  name?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type I18NLocaleEntity = {
  __typename?: 'I18NLocaleEntity';
  attributes?: Maybe<I18NLocale>;
  id?: Maybe<Scalars['ID']>;
};

export type I18NLocaleEntityResponse = {
  __typename?: 'I18NLocaleEntityResponse';
  data?: Maybe<I18NLocaleEntity>;
};

export type I18NLocaleEntityResponseCollection = {
  __typename?: 'I18NLocaleEntityResponseCollection';
  data: Array<I18NLocaleEntity>;
  meta: ResponseCollectionMeta;
};

export type I18NLocaleFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<I18NLocaleFiltersInput>>>;
  code?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<I18NLocaleFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<I18NLocaleFiltersInput>>>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type IdFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  contains?: InputMaybe<Scalars['ID']>;
  containsi?: InputMaybe<Scalars['ID']>;
  endsWith?: InputMaybe<Scalars['ID']>;
  eq?: InputMaybe<Scalars['ID']>;
  eqi?: InputMaybe<Scalars['ID']>;
  gt?: InputMaybe<Scalars['ID']>;
  gte?: InputMaybe<Scalars['ID']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  lt?: InputMaybe<Scalars['ID']>;
  lte?: InputMaybe<Scalars['ID']>;
  ne?: InputMaybe<Scalars['ID']>;
  not?: InputMaybe<IdFilterInput>;
  notContains?: InputMaybe<Scalars['ID']>;
  notContainsi?: InputMaybe<Scalars['ID']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  startsWith?: InputMaybe<Scalars['ID']>;
};

export type IntFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  contains?: InputMaybe<Scalars['Int']>;
  containsi?: InputMaybe<Scalars['Int']>;
  endsWith?: InputMaybe<Scalars['Int']>;
  eq?: InputMaybe<Scalars['Int']>;
  eqi?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  ne?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<IntFilterInput>;
  notContains?: InputMaybe<Scalars['Int']>;
  notContainsi?: InputMaybe<Scalars['Int']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  startsWith?: InputMaybe<Scalars['Int']>;
};

export type JsonFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>;
  contains?: InputMaybe<Scalars['JSON']>;
  containsi?: InputMaybe<Scalars['JSON']>;
  endsWith?: InputMaybe<Scalars['JSON']>;
  eq?: InputMaybe<Scalars['JSON']>;
  eqi?: InputMaybe<Scalars['JSON']>;
  gt?: InputMaybe<Scalars['JSON']>;
  gte?: InputMaybe<Scalars['JSON']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>;
  lt?: InputMaybe<Scalars['JSON']>;
  lte?: InputMaybe<Scalars['JSON']>;
  ne?: InputMaybe<Scalars['JSON']>;
  not?: InputMaybe<JsonFilterInput>;
  notContains?: InputMaybe<Scalars['JSON']>;
  notContainsi?: InputMaybe<Scalars['JSON']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>;
  startsWith?: InputMaybe<Scalars['JSON']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Change user password. Confirm with the current password. */
  changePassword?: Maybe<UsersPermissionsLoginPayload>;
  createAuthor?: Maybe<AuthorEntityResponse>;
  createBook?: Maybe<BookEntityResponse>;
  createCategory?: Maybe<CategoryEntityResponse>;
  createPublisher?: Maybe<PublisherEntityResponse>;
  createRating?: Maybe<RatingEntityResponse>;
  createUploadFile?: Maybe<UploadFileEntityResponse>;
  createUploadFolder?: Maybe<UploadFolderEntityResponse>;
  /** Create a new role */
  createUsersPermissionsRole?: Maybe<UsersPermissionsCreateRolePayload>;
  /** Create a new user */
  createUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  createWishlist?: Maybe<WishlistEntityResponse>;
  deleteAuthor?: Maybe<AuthorEntityResponse>;
  deleteBook?: Maybe<BookEntityResponse>;
  deleteCategory?: Maybe<CategoryEntityResponse>;
  deletePublisher?: Maybe<PublisherEntityResponse>;
  deleteRating?: Maybe<RatingEntityResponse>;
  deleteUploadFile?: Maybe<UploadFileEntityResponse>;
  deleteUploadFolder?: Maybe<UploadFolderEntityResponse>;
  /** Delete an existing role */
  deleteUsersPermissionsRole?: Maybe<UsersPermissionsDeleteRolePayload>;
  /** Delete an existing user */
  deleteUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  deleteWishlist?: Maybe<WishlistEntityResponse>;
  /** Confirm an email users email address */
  emailConfirmation?: Maybe<UsersPermissionsLoginPayload>;
  /** Request a reset password token */
  forgotPassword?: Maybe<UsersPermissionsPasswordPayload>;
  login: UsersPermissionsLoginPayload;
  multipleUpload: Array<Maybe<UploadFileEntityResponse>>;
  /** Register a user */
  register: UsersPermissionsLoginPayload;
  removeFile?: Maybe<UploadFileEntityResponse>;
  /** Reset user password. Confirm with a code (resetToken from forgotPassword) */
  resetPassword?: Maybe<UsersPermissionsLoginPayload>;
  updateAuthor?: Maybe<AuthorEntityResponse>;
  updateBook?: Maybe<BookEntityResponse>;
  updateCategory?: Maybe<CategoryEntityResponse>;
  updateFileInfo: UploadFileEntityResponse;
  updatePublisher?: Maybe<PublisherEntityResponse>;
  updateRating?: Maybe<RatingEntityResponse>;
  updateUploadFile?: Maybe<UploadFileEntityResponse>;
  updateUploadFolder?: Maybe<UploadFolderEntityResponse>;
  /** Update an existing role */
  updateUsersPermissionsRole?: Maybe<UsersPermissionsUpdateRolePayload>;
  /** Update an existing user */
  updateUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  updateWishlist?: Maybe<WishlistEntityResponse>;
  upload: UploadFileEntityResponse;
};


export type MutationChangePasswordArgs = {
  currentPassword: Scalars['String'];
  password: Scalars['String'];
  passwordConfirmation: Scalars['String'];
};


export type MutationCreateAuthorArgs = {
  data: AuthorInput;
};


export type MutationCreateBookArgs = {
  data: BookInput;
};


export type MutationCreateCategoryArgs = {
  data: CategoryInput;
};


export type MutationCreatePublisherArgs = {
  data: PublisherInput;
};


export type MutationCreateRatingArgs = {
  data: RatingInput;
};


export type MutationCreateUploadFileArgs = {
  data: UploadFileInput;
};


export type MutationCreateUploadFolderArgs = {
  data: UploadFolderInput;
};


export type MutationCreateUsersPermissionsRoleArgs = {
  data: UsersPermissionsRoleInput;
};


export type MutationCreateUsersPermissionsUserArgs = {
  data: UsersPermissionsUserInput;
};


export type MutationCreateWishlistArgs = {
  data: WishlistInput;
};


export type MutationDeleteAuthorArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteBookArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteCategoryArgs = {
  id: Scalars['ID'];
};


export type MutationDeletePublisherArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteRatingArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteUploadFileArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteUploadFolderArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteUsersPermissionsRoleArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteUsersPermissionsUserArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteWishlistArgs = {
  id: Scalars['ID'];
};


export type MutationEmailConfirmationArgs = {
  confirmation: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  input: UsersPermissionsLoginInput;
};


export type MutationMultipleUploadArgs = {
  field?: InputMaybe<Scalars['String']>;
  files: Array<InputMaybe<Scalars['Upload']>>;
  ref?: InputMaybe<Scalars['String']>;
  refId?: InputMaybe<Scalars['ID']>;
};


export type MutationRegisterArgs = {
  input: UsersPermissionsRegisterInput;
};


export type MutationRemoveFileArgs = {
  id: Scalars['ID'];
};


export type MutationResetPasswordArgs = {
  code: Scalars['String'];
  password: Scalars['String'];
  passwordConfirmation: Scalars['String'];
};


export type MutationUpdateAuthorArgs = {
  data: AuthorInput;
  id: Scalars['ID'];
};


export type MutationUpdateBookArgs = {
  data: BookInput;
  id: Scalars['ID'];
};


export type MutationUpdateCategoryArgs = {
  data: CategoryInput;
  id: Scalars['ID'];
};


export type MutationUpdateFileInfoArgs = {
  id: Scalars['ID'];
  info?: InputMaybe<FileInfoInput>;
};


export type MutationUpdatePublisherArgs = {
  data: PublisherInput;
  id: Scalars['ID'];
};


export type MutationUpdateRatingArgs = {
  data: RatingInput;
  id: Scalars['ID'];
};


export type MutationUpdateUploadFileArgs = {
  data: UploadFileInput;
  id: Scalars['ID'];
};


export type MutationUpdateUploadFolderArgs = {
  data: UploadFolderInput;
  id: Scalars['ID'];
};


export type MutationUpdateUsersPermissionsRoleArgs = {
  data: UsersPermissionsRoleInput;
  id: Scalars['ID'];
};


export type MutationUpdateUsersPermissionsUserArgs = {
  data: UsersPermissionsUserInput;
  id: Scalars['ID'];
};


export type MutationUpdateWishlistArgs = {
  data: WishlistInput;
  id: Scalars['ID'];
};


export type MutationUploadArgs = {
  field?: InputMaybe<Scalars['String']>;
  file: Scalars['Upload'];
  info?: InputMaybe<FileInfoInput>;
  ref?: InputMaybe<Scalars['String']>;
  refId?: InputMaybe<Scalars['ID']>;
};

export type Pagination = {
  __typename?: 'Pagination';
  page: Scalars['Int'];
  pageCount: Scalars['Int'];
  pageSize: Scalars['Int'];
  total: Scalars['Int'];
};

export type PaginationArg = {
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  start?: InputMaybe<Scalars['Int']>;
};

export enum PublicationState {
  Live = 'LIVE',
  Preview = 'PREVIEW'
}

export type Publisher = {
  __typename?: 'Publisher';
  createdAt?: Maybe<Scalars['DateTime']>;
  name?: Maybe<Scalars['String']>;
  publishedAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type PublisherEntity = {
  __typename?: 'PublisherEntity';
  attributes?: Maybe<Publisher>;
  id?: Maybe<Scalars['ID']>;
};

export type PublisherEntityResponse = {
  __typename?: 'PublisherEntityResponse';
  data?: Maybe<PublisherEntity>;
};

export type PublisherEntityResponseCollection = {
  __typename?: 'PublisherEntityResponseCollection';
  data: Array<PublisherEntity>;
  meta: ResponseCollectionMeta;
};

export type PublisherFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<PublisherFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<PublisherFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<PublisherFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type PublisherInput = {
  name?: InputMaybe<Scalars['String']>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
};

export type Query = {
  __typename?: 'Query';
  author?: Maybe<AuthorEntityResponse>;
  authors?: Maybe<AuthorEntityResponseCollection>;
  book?: Maybe<BookEntityResponse>;
  books?: Maybe<BookEntityResponseCollection>;
  categories?: Maybe<CategoryEntityResponseCollection>;
  category?: Maybe<CategoryEntityResponse>;
  i18NLocale?: Maybe<I18NLocaleEntityResponse>;
  i18NLocales?: Maybe<I18NLocaleEntityResponseCollection>;
  me?: Maybe<UsersPermissionsMe>;
  publisher?: Maybe<PublisherEntityResponse>;
  publishers?: Maybe<PublisherEntityResponseCollection>;
  rating?: Maybe<RatingEntityResponse>;
  ratings?: Maybe<RatingEntityResponseCollection>;
  uploadFile?: Maybe<UploadFileEntityResponse>;
  uploadFiles?: Maybe<UploadFileEntityResponseCollection>;
  uploadFolder?: Maybe<UploadFolderEntityResponse>;
  uploadFolders?: Maybe<UploadFolderEntityResponseCollection>;
  usersPermissionsRole?: Maybe<UsersPermissionsRoleEntityResponse>;
  usersPermissionsRoles?: Maybe<UsersPermissionsRoleEntityResponseCollection>;
  usersPermissionsUser?: Maybe<UsersPermissionsUserEntityResponse>;
  usersPermissionsUsers?: Maybe<UsersPermissionsUserEntityResponseCollection>;
  wishlist?: Maybe<WishlistEntityResponse>;
  wishlists?: Maybe<WishlistEntityResponseCollection>;
};


export type QueryAuthorArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryAuthorsArgs = {
  filters?: InputMaybe<AuthorFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryBookArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryBooksArgs = {
  filters?: InputMaybe<BookFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryCategoriesArgs = {
  filters?: InputMaybe<CategoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryCategoryArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryI18NLocaleArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryI18NLocalesArgs = {
  filters?: InputMaybe<I18NLocaleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryPublisherArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryPublishersArgs = {
  filters?: InputMaybe<PublisherFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryRatingArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryRatingsArgs = {
  filters?: InputMaybe<RatingFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryUploadFileArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryUploadFilesArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryUploadFolderArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryUploadFoldersArgs = {
  filters?: InputMaybe<UploadFolderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryUsersPermissionsRoleArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryUsersPermissionsRolesArgs = {
  filters?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryUsersPermissionsUserArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryUsersPermissionsUsersArgs = {
  filters?: InputMaybe<UsersPermissionsUserFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryWishlistArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryWishlistsArgs = {
  filters?: InputMaybe<WishlistFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Rating = {
  __typename?: 'Rating';
  book?: Maybe<BookEntityResponse>;
  createdAt?: Maybe<Scalars['DateTime']>;
  rating: Scalars['Float'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  user_ids?: Maybe<UsersPermissionsUserRelationResponseCollection>;
};


export type RatingUser_IdsArgs = {
  filters?: InputMaybe<UsersPermissionsUserFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type RatingEntity = {
  __typename?: 'RatingEntity';
  attributes?: Maybe<Rating>;
  id?: Maybe<Scalars['ID']>;
};

export type RatingEntityResponse = {
  __typename?: 'RatingEntityResponse';
  data?: Maybe<RatingEntity>;
};

export type RatingEntityResponseCollection = {
  __typename?: 'RatingEntityResponseCollection';
  data: Array<RatingEntity>;
  meta: ResponseCollectionMeta;
};

export type RatingFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<RatingFiltersInput>>>;
  book?: InputMaybe<BookFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<RatingFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<RatingFiltersInput>>>;
  rating?: InputMaybe<FloatFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  user_ids?: InputMaybe<UsersPermissionsUserFiltersInput>;
};

export type RatingInput = {
  book?: InputMaybe<Scalars['ID']>;
  rating?: InputMaybe<Scalars['Float']>;
  user_ids?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};

export type ResponseCollectionMeta = {
  __typename?: 'ResponseCollectionMeta';
  pagination: Pagination;
};

export type StringFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  contains?: InputMaybe<Scalars['String']>;
  containsi?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  eq?: InputMaybe<Scalars['String']>;
  eqi?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  ne?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<StringFilterInput>;
  notContains?: InputMaybe<Scalars['String']>;
  notContainsi?: InputMaybe<Scalars['String']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type UploadFile = {
  __typename?: 'UploadFile';
  alternativeText?: Maybe<Scalars['String']>;
  caption?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  ext?: Maybe<Scalars['String']>;
  formats?: Maybe<Scalars['JSON']>;
  hash: Scalars['String'];
  height?: Maybe<Scalars['Int']>;
  mime: Scalars['String'];
  name: Scalars['String'];
  previewUrl?: Maybe<Scalars['String']>;
  provider: Scalars['String'];
  provider_metadata?: Maybe<Scalars['JSON']>;
  related?: Maybe<Array<Maybe<GenericMorph>>>;
  size: Scalars['Float'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  url: Scalars['String'];
  width?: Maybe<Scalars['Int']>;
};

export type UploadFileEntity = {
  __typename?: 'UploadFileEntity';
  attributes?: Maybe<UploadFile>;
  id?: Maybe<Scalars['ID']>;
};

export type UploadFileEntityResponse = {
  __typename?: 'UploadFileEntityResponse';
  data?: Maybe<UploadFileEntity>;
};

export type UploadFileEntityResponseCollection = {
  __typename?: 'UploadFileEntityResponseCollection';
  data: Array<UploadFileEntity>;
  meta: ResponseCollectionMeta;
};

export type UploadFileFiltersInput = {
  alternativeText?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<UploadFileFiltersInput>>>;
  caption?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  ext?: InputMaybe<StringFilterInput>;
  folder?: InputMaybe<UploadFolderFiltersInput>;
  folderPath?: InputMaybe<StringFilterInput>;
  formats?: InputMaybe<JsonFilterInput>;
  hash?: InputMaybe<StringFilterInput>;
  height?: InputMaybe<IntFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  mime?: InputMaybe<StringFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<UploadFileFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UploadFileFiltersInput>>>;
  previewUrl?: InputMaybe<StringFilterInput>;
  provider?: InputMaybe<StringFilterInput>;
  provider_metadata?: InputMaybe<JsonFilterInput>;
  size?: InputMaybe<FloatFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  url?: InputMaybe<StringFilterInput>;
  width?: InputMaybe<IntFilterInput>;
};

export type UploadFileInput = {
  alternativeText?: InputMaybe<Scalars['String']>;
  caption?: InputMaybe<Scalars['String']>;
  ext?: InputMaybe<Scalars['String']>;
  folder?: InputMaybe<Scalars['ID']>;
  folderPath?: InputMaybe<Scalars['String']>;
  formats?: InputMaybe<Scalars['JSON']>;
  hash?: InputMaybe<Scalars['String']>;
  height?: InputMaybe<Scalars['Int']>;
  mime?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  previewUrl?: InputMaybe<Scalars['String']>;
  provider?: InputMaybe<Scalars['String']>;
  provider_metadata?: InputMaybe<Scalars['JSON']>;
  size?: InputMaybe<Scalars['Float']>;
  url?: InputMaybe<Scalars['String']>;
  width?: InputMaybe<Scalars['Int']>;
};

export type UploadFileRelationResponseCollection = {
  __typename?: 'UploadFileRelationResponseCollection';
  data: Array<UploadFileEntity>;
};

export type UploadFolder = {
  __typename?: 'UploadFolder';
  children?: Maybe<UploadFolderRelationResponseCollection>;
  createdAt?: Maybe<Scalars['DateTime']>;
  files?: Maybe<UploadFileRelationResponseCollection>;
  name: Scalars['String'];
  parent?: Maybe<UploadFolderEntityResponse>;
  path: Scalars['String'];
  pathId: Scalars['Int'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type UploadFolderChildrenArgs = {
  filters?: InputMaybe<UploadFolderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type UploadFolderFilesArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type UploadFolderEntity = {
  __typename?: 'UploadFolderEntity';
  attributes?: Maybe<UploadFolder>;
  id?: Maybe<Scalars['ID']>;
};

export type UploadFolderEntityResponse = {
  __typename?: 'UploadFolderEntityResponse';
  data?: Maybe<UploadFolderEntity>;
};

export type UploadFolderEntityResponseCollection = {
  __typename?: 'UploadFolderEntityResponseCollection';
  data: Array<UploadFolderEntity>;
  meta: ResponseCollectionMeta;
};

export type UploadFolderFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<UploadFolderFiltersInput>>>;
  children?: InputMaybe<UploadFolderFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  files?: InputMaybe<UploadFileFiltersInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<UploadFolderFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UploadFolderFiltersInput>>>;
  parent?: InputMaybe<UploadFolderFiltersInput>;
  path?: InputMaybe<StringFilterInput>;
  pathId?: InputMaybe<IntFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type UploadFolderInput = {
  children?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  files?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  name?: InputMaybe<Scalars['String']>;
  parent?: InputMaybe<Scalars['ID']>;
  path?: InputMaybe<Scalars['String']>;
  pathId?: InputMaybe<Scalars['Int']>;
};

export type UploadFolderRelationResponseCollection = {
  __typename?: 'UploadFolderRelationResponseCollection';
  data: Array<UploadFolderEntity>;
};

export type UsersPermissionsCreateRolePayload = {
  __typename?: 'UsersPermissionsCreateRolePayload';
  ok: Scalars['Boolean'];
};

export type UsersPermissionsDeleteRolePayload = {
  __typename?: 'UsersPermissionsDeleteRolePayload';
  ok: Scalars['Boolean'];
};

export type UsersPermissionsLoginInput = {
  identifier: Scalars['String'];
  password: Scalars['String'];
  provider?: Scalars['String'];
};

export type UsersPermissionsLoginPayload = {
  __typename?: 'UsersPermissionsLoginPayload';
  jwt?: Maybe<Scalars['String']>;
  user: UsersPermissionsMe;
};

export type UsersPermissionsMe = {
  __typename?: 'UsersPermissionsMe';
  blocked?: Maybe<Scalars['Boolean']>;
  confirmed?: Maybe<Scalars['Boolean']>;
  email?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  role?: Maybe<UsersPermissionsMeRole>;
  username: Scalars['String'];
};

export type UsersPermissionsMeRole = {
  __typename?: 'UsersPermissionsMeRole';
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  type?: Maybe<Scalars['String']>;
};

export type UsersPermissionsPasswordPayload = {
  __typename?: 'UsersPermissionsPasswordPayload';
  ok: Scalars['Boolean'];
};

export type UsersPermissionsPermission = {
  __typename?: 'UsersPermissionsPermission';
  action: Scalars['String'];
  createdAt?: Maybe<Scalars['DateTime']>;
  role?: Maybe<UsersPermissionsRoleEntityResponse>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type UsersPermissionsPermissionEntity = {
  __typename?: 'UsersPermissionsPermissionEntity';
  attributes?: Maybe<UsersPermissionsPermission>;
  id?: Maybe<Scalars['ID']>;
};

export type UsersPermissionsPermissionFiltersInput = {
  action?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsPermissionFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsPermissionFiltersInput>>>;
  role?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type UsersPermissionsPermissionRelationResponseCollection = {
  __typename?: 'UsersPermissionsPermissionRelationResponseCollection';
  data: Array<UsersPermissionsPermissionEntity>;
};

export type UsersPermissionsRegisterInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type UsersPermissionsRole = {
  __typename?: 'UsersPermissionsRole';
  createdAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  permissions?: Maybe<UsersPermissionsPermissionRelationResponseCollection>;
  type?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  users?: Maybe<UsersPermissionsUserRelationResponseCollection>;
};


export type UsersPermissionsRolePermissionsArgs = {
  filters?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type UsersPermissionsRoleUsersArgs = {
  filters?: InputMaybe<UsersPermissionsUserFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type UsersPermissionsRoleEntity = {
  __typename?: 'UsersPermissionsRoleEntity';
  attributes?: Maybe<UsersPermissionsRole>;
  id?: Maybe<Scalars['ID']>;
};

export type UsersPermissionsRoleEntityResponse = {
  __typename?: 'UsersPermissionsRoleEntityResponse';
  data?: Maybe<UsersPermissionsRoleEntity>;
};

export type UsersPermissionsRoleEntityResponseCollection = {
  __typename?: 'UsersPermissionsRoleEntityResponseCollection';
  data: Array<UsersPermissionsRoleEntity>;
  meta: ResponseCollectionMeta;
};

export type UsersPermissionsRoleFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsRoleFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsRoleFiltersInput>>>;
  permissions?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  type?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  users?: InputMaybe<UsersPermissionsUserFiltersInput>;
};

export type UsersPermissionsRoleInput = {
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  permissions?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  type?: InputMaybe<Scalars['String']>;
  users?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};

export type UsersPermissionsUpdateRolePayload = {
  __typename?: 'UsersPermissionsUpdateRolePayload';
  ok: Scalars['Boolean'];
};

export type UsersPermissionsUser = {
  __typename?: 'UsersPermissionsUser';
  blocked?: Maybe<Scalars['Boolean']>;
  confirmed?: Maybe<Scalars['Boolean']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  provider?: Maybe<Scalars['String']>;
  role?: Maybe<UsersPermissionsRoleEntityResponse>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  username: Scalars['String'];
};

export type UsersPermissionsUserEntity = {
  __typename?: 'UsersPermissionsUserEntity';
  attributes?: Maybe<UsersPermissionsUser>;
  id?: Maybe<Scalars['ID']>;
};

export type UsersPermissionsUserEntityResponse = {
  __typename?: 'UsersPermissionsUserEntityResponse';
  data?: Maybe<UsersPermissionsUserEntity>;
};

export type UsersPermissionsUserEntityResponseCollection = {
  __typename?: 'UsersPermissionsUserEntityResponseCollection';
  data: Array<UsersPermissionsUserEntity>;
  meta: ResponseCollectionMeta;
};

export type UsersPermissionsUserFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsUserFiltersInput>>>;
  blocked?: InputMaybe<BooleanFilterInput>;
  confirmationToken?: InputMaybe<StringFilterInput>;
  confirmed?: InputMaybe<BooleanFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  email?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<UsersPermissionsUserFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsUserFiltersInput>>>;
  password?: InputMaybe<StringFilterInput>;
  provider?: InputMaybe<StringFilterInput>;
  resetPasswordToken?: InputMaybe<StringFilterInput>;
  role?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  username?: InputMaybe<StringFilterInput>;
};

export type UsersPermissionsUserInput = {
  blocked?: InputMaybe<Scalars['Boolean']>;
  confirmationToken?: InputMaybe<Scalars['String']>;
  confirmed?: InputMaybe<Scalars['Boolean']>;
  email?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  provider?: InputMaybe<Scalars['String']>;
  resetPasswordToken?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<Scalars['ID']>;
  username?: InputMaybe<Scalars['String']>;
};

export type UsersPermissionsUserRelationResponseCollection = {
  __typename?: 'UsersPermissionsUserRelationResponseCollection';
  data: Array<UsersPermissionsUserEntity>;
};

export type Wishlist = {
  __typename?: 'Wishlist';
  books?: Maybe<BookRelationResponseCollection>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  user?: Maybe<UsersPermissionsUserEntityResponse>;
};


export type WishlistBooksArgs = {
  filters?: InputMaybe<BookFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type WishlistEntity = {
  __typename?: 'WishlistEntity';
  attributes?: Maybe<Wishlist>;
  id?: Maybe<Scalars['ID']>;
};

export type WishlistEntityResponse = {
  __typename?: 'WishlistEntityResponse';
  data?: Maybe<WishlistEntity>;
};

export type WishlistEntityResponseCollection = {
  __typename?: 'WishlistEntityResponseCollection';
  data: Array<WishlistEntity>;
  meta: ResponseCollectionMeta;
};

export type WishlistFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<WishlistFiltersInput>>>;
  books?: InputMaybe<BookFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<WishlistFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<WishlistFiltersInput>>>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  user?: InputMaybe<UsersPermissionsUserFiltersInput>;
};

export type WishlistInput = {
  books?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  user?: InputMaybe<Scalars['ID']>;
};

export type UpdateBookMutationVariables = Exact<{
  bookId: Scalars['ID'];
  userRatings: Scalars['JSON'];
  rating: Scalars['Float'];
  totalRatings: Scalars['Int'];
}>;


export type UpdateBookMutation = { __typename?: 'Mutation', updateBook?: { __typename?: 'BookEntityResponse', data?: { __typename?: 'BookEntity', id?: string | null, attributes?: { __typename?: 'Book', userRatings?: any | null, rating?: number | null, totalRatings?: number | null } | null } | null } | null };

export type RatingFragmentFragment = { __typename?: 'Rating', rating: number, book?: { __typename?: 'BookEntityResponse', data?: { __typename?: 'BookEntity', attributes?: { __typename?: 'Book', userRatings?: any | null, rating?: number | null } | null } | null } | null };

export type CreateRatingMutationVariables = Exact<{
  userId?: InputMaybe<Array<InputMaybe<Scalars['ID']>> | InputMaybe<Scalars['ID']>>;
  bookId: Scalars['ID'];
  rating: Scalars['Float'];
}>;


export type CreateRatingMutation = { __typename?: 'Mutation', createRating?: { __typename?: 'RatingEntityResponse', data?: { __typename?: 'RatingEntity', id?: string | null, attributes?: { __typename?: 'Rating', rating: number, book?: { __typename?: 'BookEntityResponse', data?: { __typename?: 'BookEntity', attributes?: { __typename?: 'Book', userRatings?: any | null, rating?: number | null } | null } | null } | null } | null } | null } | null };

export type UpdateRatingMutationVariables = Exact<{
  ratingId: Scalars['ID'];
  rating: Scalars['Float'];
}>;


export type UpdateRatingMutation = { __typename?: 'Mutation', updateRating?: { __typename?: 'RatingEntityResponse', data?: { __typename?: 'RatingEntity', id?: string | null, attributes?: { __typename?: 'Rating', rating: number, book?: { __typename?: 'BookEntityResponse', data?: { __typename?: 'BookEntity', attributes?: { __typename?: 'Book', userRatings?: any | null, rating?: number | null } | null } | null } | null } | null } | null } | null };

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UsersPermissionsLoginPayload', jwt?: string | null, user: { __typename?: 'UsersPermissionsMe', id: string, username: string, email?: string | null } } };

export type WishlistFragmentFragment = { __typename?: 'Wishlist', user?: { __typename?: 'UsersPermissionsUserEntityResponse', data?: { __typename?: 'UsersPermissionsUserEntity', id?: string | null } | null } | null, books?: { __typename?: 'BookRelationResponseCollection', data: Array<{ __typename?: 'BookEntity', id?: string | null, attributes?: { __typename?: 'Book', title: string, sku: string, coverImageUrl: string, isOnSale: boolean, pageCount: number, userRatings?: any | null, price: number, rating?: number | null, salePrice: number, synopsis: string, stock: number, totalRatings?: number | null, authors?: { __typename?: 'AuthorRelationResponseCollection', data: Array<{ __typename?: 'AuthorEntity', attributes?: { __typename?: 'Author', name?: string | null } | null }> } | null, publisher?: { __typename?: 'PublisherEntityResponse', data?: { __typename?: 'PublisherEntity', attributes?: { __typename?: 'Publisher', name?: string | null } | null } | null } | null } | null }> } | null };

export type CreateWishlistMutationVariables = Exact<{
  data: WishlistInput;
}>;


export type CreateWishlistMutation = { __typename?: 'Mutation', createWishlist?: { __typename?: 'WishlistEntityResponse', data?: { __typename?: 'WishlistEntity', id?: string | null, attributes?: { __typename?: 'Wishlist', user?: { __typename?: 'UsersPermissionsUserEntityResponse', data?: { __typename?: 'UsersPermissionsUserEntity', id?: string | null } | null } | null, books?: { __typename?: 'BookRelationResponseCollection', data: Array<{ __typename?: 'BookEntity', id?: string | null, attributes?: { __typename?: 'Book', title: string, sku: string, coverImageUrl: string, isOnSale: boolean, pageCount: number, userRatings?: any | null, price: number, rating?: number | null, salePrice: number, synopsis: string, stock: number, totalRatings?: number | null, authors?: { __typename?: 'AuthorRelationResponseCollection', data: Array<{ __typename?: 'AuthorEntity', attributes?: { __typename?: 'Author', name?: string | null } | null }> } | null, publisher?: { __typename?: 'PublisherEntityResponse', data?: { __typename?: 'PublisherEntity', attributes?: { __typename?: 'Publisher', name?: string | null } | null } | null } | null } | null }> } | null } | null } | null } | null };

export type UpdateWishlistMutationVariables = Exact<{
  id: Scalars['ID'];
  data: WishlistInput;
}>;


export type UpdateWishlistMutation = { __typename?: 'Mutation', updateWishlist?: { __typename?: 'WishlistEntityResponse', data?: { __typename?: 'WishlistEntity', id?: string | null, attributes?: { __typename?: 'Wishlist', user?: { __typename?: 'UsersPermissionsUserEntityResponse', data?: { __typename?: 'UsersPermissionsUserEntity', id?: string | null } | null } | null, books?: { __typename?: 'BookRelationResponseCollection', data: Array<{ __typename?: 'BookEntity', id?: string | null, attributes?: { __typename?: 'Book', title: string, sku: string, coverImageUrl: string, isOnSale: boolean, pageCount: number, userRatings?: any | null, price: number, rating?: number | null, salePrice: number, synopsis: string, stock: number, totalRatings?: number | null, authors?: { __typename?: 'AuthorRelationResponseCollection', data: Array<{ __typename?: 'AuthorEntity', attributes?: { __typename?: 'Author', name?: string | null } | null }> } | null, publisher?: { __typename?: 'PublisherEntityResponse', data?: { __typename?: 'PublisherEntity', attributes?: { __typename?: 'Publisher', name?: string | null } | null } | null } | null } | null }> } | null } | null } | null } | null };

export type DeleteWishlistMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteWishlistMutation = { __typename?: 'Mutation', deleteWishlist?: { __typename?: 'WishlistEntityResponse', data?: { __typename?: 'WishlistEntity', id?: string | null, attributes?: { __typename?: 'Wishlist', user?: { __typename?: 'UsersPermissionsUserEntityResponse', data?: { __typename?: 'UsersPermissionsUserEntity', id?: string | null } | null } | null, books?: { __typename?: 'BookRelationResponseCollection', data: Array<{ __typename?: 'BookEntity', id?: string | null, attributes?: { __typename?: 'Book', title: string, sku: string, coverImageUrl: string, isOnSale: boolean, pageCount: number, userRatings?: any | null, price: number, rating?: number | null, salePrice: number, synopsis: string, stock: number, totalRatings?: number | null, authors?: { __typename?: 'AuthorRelationResponseCollection', data: Array<{ __typename?: 'AuthorEntity', attributes?: { __typename?: 'Author', name?: string | null } | null }> } | null, publisher?: { __typename?: 'PublisherEntityResponse', data?: { __typename?: 'PublisherEntity', attributes?: { __typename?: 'Publisher', name?: string | null } | null } | null } | null } | null }> } | null } | null } | null } | null };

export type BooksQueryVariables = Exact<{ [key: string]: never; }>;


export type BooksQuery = { __typename?: 'Query', books?: { __typename?: 'BookEntityResponseCollection', data: Array<{ __typename?: 'BookEntity', attributes?: { __typename?: 'Book', title: string, synopsis: string } | null }> } | null };

export type FeaturedQueryVariables = Exact<{ [key: string]: never; }>;


export type FeaturedQuery = { __typename?: 'Query', books?: { __typename?: 'BookEntityResponseCollection', data: Array<{ __typename?: 'BookEntity', id?: string | null, attributes?: { __typename?: 'Book', title: string, price: number, coverImageUrl: string, rating?: number | null } | null }> } | null };

export type BookQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type BookQuery = { __typename?: 'Query', book?: { __typename?: 'BookEntityResponse', data?: { __typename?: 'BookEntity', id?: string | null, attributes?: { __typename?: 'Book', title: string, sku: string, coverImageUrl: string, isOnSale: boolean, pageCount: number, userRatings?: any | null, price: number, rating?: number | null, salePrice: number, synopsis: string, stock: number, totalRatings?: number | null, authors?: { __typename?: 'AuthorRelationResponseCollection', data: Array<{ __typename?: 'AuthorEntity', attributes?: { __typename?: 'Author', name?: string | null } | null }> } | null, publisher?: { __typename?: 'PublisherEntityResponse', data?: { __typename?: 'PublisherEntity', attributes?: { __typename?: 'Publisher', name?: string | null } | null } | null } | null } | null } | null } | null };

export type BooksFiltersQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  filters?: InputMaybe<BookFiltersInput>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>> | InputMaybe<Scalars['String']>>;
}>;


export type BooksFiltersQuery = { __typename?: 'Query', books?: { __typename?: 'BookEntityResponseCollection', data: Array<{ __typename?: 'BookEntity', id?: string | null, attributes?: { __typename?: 'Book', title: string, price: number, coverImageUrl: string, rating?: number | null, authors?: { __typename?: 'AuthorRelationResponseCollection', data: Array<{ __typename?: 'AuthorEntity', id?: string | null, attributes?: { __typename?: 'Author', name?: string | null } | null }> } | null, publisher?: { __typename?: 'PublisherEntityResponse', data?: { __typename?: 'PublisherEntity', id?: string | null, attributes?: { __typename?: 'Publisher', name?: string | null } | null } | null } | null } | null }>, meta: { __typename?: 'ResponseCollectionMeta', pagination: { __typename?: 'Pagination', page: number, pageSize: number, pageCount: number, total: number } } } | null };

export type RatingsQueryVariables = Exact<{
  bookId: Scalars['ID'];
  userId: Scalars['ID'];
}>;


export type RatingsQuery = { __typename?: 'Query', ratings?: { __typename?: 'RatingEntityResponseCollection', data: Array<{ __typename?: 'RatingEntity', id?: string | null, attributes?: { __typename?: 'Rating', rating: number, user_ids?: { __typename?: 'UsersPermissionsUserRelationResponseCollection', data: Array<{ __typename?: 'UsersPermissionsUserEntity', id?: string | null }> } | null, book?: { __typename?: 'BookEntityResponse', data?: { __typename?: 'BookEntity', id?: string | null, attributes?: { __typename?: 'Book', userRatings?: any | null, rating?: number | null } | null } | null } | null } | null }> } | null };

export type WishlistQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type WishlistQuery = { __typename?: 'Query', wishlist?: { __typename?: 'WishlistEntityResponse', data?: { __typename?: 'WishlistEntity', attributes?: { __typename?: 'Wishlist', user?: { __typename?: 'UsersPermissionsUserEntityResponse', data?: { __typename?: 'UsersPermissionsUserEntity', id?: string | null } | null } | null, books?: { __typename?: 'BookRelationResponseCollection', data: Array<{ __typename?: 'BookEntity', id?: string | null, attributes?: { __typename?: 'Book', title: string, sku: string, coverImageUrl: string, isOnSale: boolean, pageCount: number, userRatings?: any | null, price: number, rating?: number | null, salePrice: number, synopsis: string, stock: number, totalRatings?: number | null, authors?: { __typename?: 'AuthorRelationResponseCollection', data: Array<{ __typename?: 'AuthorEntity', attributes?: { __typename?: 'Author', name?: string | null } | null }> } | null, publisher?: { __typename?: 'PublisherEntityResponse', data?: { __typename?: 'PublisherEntity', attributes?: { __typename?: 'Publisher', name?: string | null } | null } | null } | null } | null }> } | null } | null } | null } | null };

export type WishlistsQueryVariables = Exact<{
  userId: Scalars['ID'];
}>;


export type WishlistsQuery = { __typename?: 'Query', wishlists?: { __typename?: 'WishlistEntityResponseCollection', data: Array<{ __typename?: 'WishlistEntity', id?: string | null, attributes?: { __typename?: 'Wishlist', user?: { __typename?: 'UsersPermissionsUserEntityResponse', data?: { __typename?: 'UsersPermissionsUserEntity', id?: string | null } | null } | null, books?: { __typename?: 'BookRelationResponseCollection', data: Array<{ __typename?: 'BookEntity', id?: string | null, attributes?: { __typename?: 'Book', title: string, sku: string, coverImageUrl: string, isOnSale: boolean, pageCount: number, userRatings?: any | null, price: number, rating?: number | null, salePrice: number, synopsis: string, stock: number, totalRatings?: number | null, authors?: { __typename?: 'AuthorRelationResponseCollection', data: Array<{ __typename?: 'AuthorEntity', attributes?: { __typename?: 'Author', name?: string | null } | null }> } | null, publisher?: { __typename?: 'PublisherEntityResponse', data?: { __typename?: 'PublisherEntity', attributes?: { __typename?: 'Publisher', name?: string | null } | null } | null } | null } | null }> } | null } | null }> } | null };

export const RatingFragmentFragmentDoc = gql`
    fragment RatingFragment on Rating {
  rating
  book {
    data {
      attributes {
        userRatings
        rating
      }
    }
  }
}
    `;
export const WishlistFragmentFragmentDoc = gql`
    fragment WishlistFragment on Wishlist {
  user {
    data {
      id
    }
  }
  books {
    data {
      id
      attributes {
        title
        sku
        coverImageUrl
        isOnSale
        pageCount
        userRatings
        price
        rating
        salePrice
        synopsis
        stock
        totalRatings
        authors {
          data {
            attributes {
              name
            }
          }
        }
        publisher {
          data {
            attributes {
              name
            }
          }
        }
      }
    }
  }
}
    `;
export const UpdateBookDocument = gql`
    mutation UpdateBook($bookId: ID!, $userRatings: JSON!, $rating: Float!, $totalRatings: Int!) {
  updateBook(
    id: $bookId
    data: {userRatings: $userRatings, rating: $rating, totalRatings: $totalRatings}
  ) {
    data {
      id
      attributes {
        userRatings
        rating
        totalRatings
      }
    }
  }
}
    `;
export type UpdateBookMutationFn = Apollo.MutationFunction<UpdateBookMutation, UpdateBookMutationVariables>;

/**
 * __useUpdateBookMutation__
 *
 * To run a mutation, you first call `useUpdateBookMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBookMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBookMutation, { data, loading, error }] = useUpdateBookMutation({
 *   variables: {
 *      bookId: // value for 'bookId'
 *      userRatings: // value for 'userRatings'
 *      rating: // value for 'rating'
 *      totalRatings: // value for 'totalRatings'
 *   },
 * });
 */
export function useUpdateBookMutation(baseOptions?: Apollo.MutationHookOptions<UpdateBookMutation, UpdateBookMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateBookMutation, UpdateBookMutationVariables>(UpdateBookDocument, options);
      }
export type UpdateBookMutationHookResult = ReturnType<typeof useUpdateBookMutation>;
export type UpdateBookMutationResult = Apollo.MutationResult<UpdateBookMutation>;
export type UpdateBookMutationOptions = Apollo.BaseMutationOptions<UpdateBookMutation, UpdateBookMutationVariables>;
export const CreateRatingDocument = gql`
    mutation CreateRating($userId: [ID], $bookId: ID!, $rating: Float!) {
  createRating(data: {user_ids: $userId, book: $bookId, rating: $rating}) {
    data {
      id
      attributes {
        ...RatingFragment
      }
    }
  }
}
    ${RatingFragmentFragmentDoc}`;
export type CreateRatingMutationFn = Apollo.MutationFunction<CreateRatingMutation, CreateRatingMutationVariables>;

/**
 * __useCreateRatingMutation__
 *
 * To run a mutation, you first call `useCreateRatingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRatingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRatingMutation, { data, loading, error }] = useCreateRatingMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      bookId: // value for 'bookId'
 *      rating: // value for 'rating'
 *   },
 * });
 */
export function useCreateRatingMutation(baseOptions?: Apollo.MutationHookOptions<CreateRatingMutation, CreateRatingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateRatingMutation, CreateRatingMutationVariables>(CreateRatingDocument, options);
      }
export type CreateRatingMutationHookResult = ReturnType<typeof useCreateRatingMutation>;
export type CreateRatingMutationResult = Apollo.MutationResult<CreateRatingMutation>;
export type CreateRatingMutationOptions = Apollo.BaseMutationOptions<CreateRatingMutation, CreateRatingMutationVariables>;
export const UpdateRatingDocument = gql`
    mutation UpdateRating($ratingId: ID!, $rating: Float!) {
  updateRating(id: $ratingId, data: {rating: $rating}) {
    data {
      id
      attributes {
        ...RatingFragment
      }
    }
  }
}
    ${RatingFragmentFragmentDoc}`;
export type UpdateRatingMutationFn = Apollo.MutationFunction<UpdateRatingMutation, UpdateRatingMutationVariables>;

/**
 * __useUpdateRatingMutation__
 *
 * To run a mutation, you first call `useUpdateRatingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateRatingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateRatingMutation, { data, loading, error }] = useUpdateRatingMutation({
 *   variables: {
 *      ratingId: // value for 'ratingId'
 *      rating: // value for 'rating'
 *   },
 * });
 */
export function useUpdateRatingMutation(baseOptions?: Apollo.MutationHookOptions<UpdateRatingMutation, UpdateRatingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateRatingMutation, UpdateRatingMutationVariables>(UpdateRatingDocument, options);
      }
export type UpdateRatingMutationHookResult = ReturnType<typeof useUpdateRatingMutation>;
export type UpdateRatingMutationResult = Apollo.MutationResult<UpdateRatingMutation>;
export type UpdateRatingMutationOptions = Apollo.BaseMutationOptions<UpdateRatingMutation, UpdateRatingMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($username: String!, $email: String!, $password: String!) {
  register(input: {username: $username, email: $email, password: $password}) {
    jwt
    user {
      id
      username
      email
    }
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      username: // value for 'username'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const CreateWishlistDocument = gql`
    mutation CreateWishlist($data: WishlistInput!) {
  createWishlist(data: $data) {
    data {
      id
      attributes {
        ...WishlistFragment
      }
    }
  }
}
    ${WishlistFragmentFragmentDoc}`;
export type CreateWishlistMutationFn = Apollo.MutationFunction<CreateWishlistMutation, CreateWishlistMutationVariables>;

/**
 * __useCreateWishlistMutation__
 *
 * To run a mutation, you first call `useCreateWishlistMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateWishlistMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createWishlistMutation, { data, loading, error }] = useCreateWishlistMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateWishlistMutation(baseOptions?: Apollo.MutationHookOptions<CreateWishlistMutation, CreateWishlistMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateWishlistMutation, CreateWishlistMutationVariables>(CreateWishlistDocument, options);
      }
export type CreateWishlistMutationHookResult = ReturnType<typeof useCreateWishlistMutation>;
export type CreateWishlistMutationResult = Apollo.MutationResult<CreateWishlistMutation>;
export type CreateWishlistMutationOptions = Apollo.BaseMutationOptions<CreateWishlistMutation, CreateWishlistMutationVariables>;
export const UpdateWishlistDocument = gql`
    mutation UpdateWishlist($id: ID!, $data: WishlistInput!) {
  updateWishlist(id: $id, data: $data) {
    data {
      id
      attributes {
        ...WishlistFragment
      }
    }
  }
}
    ${WishlistFragmentFragmentDoc}`;
export type UpdateWishlistMutationFn = Apollo.MutationFunction<UpdateWishlistMutation, UpdateWishlistMutationVariables>;

/**
 * __useUpdateWishlistMutation__
 *
 * To run a mutation, you first call `useUpdateWishlistMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateWishlistMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateWishlistMutation, { data, loading, error }] = useUpdateWishlistMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateWishlistMutation(baseOptions?: Apollo.MutationHookOptions<UpdateWishlistMutation, UpdateWishlistMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateWishlistMutation, UpdateWishlistMutationVariables>(UpdateWishlistDocument, options);
      }
export type UpdateWishlistMutationHookResult = ReturnType<typeof useUpdateWishlistMutation>;
export type UpdateWishlistMutationResult = Apollo.MutationResult<UpdateWishlistMutation>;
export type UpdateWishlistMutationOptions = Apollo.BaseMutationOptions<UpdateWishlistMutation, UpdateWishlistMutationVariables>;
export const DeleteWishlistDocument = gql`
    mutation DeleteWishlist($id: ID!) {
  deleteWishlist(id: $id) {
    data {
      id
      attributes {
        ...WishlistFragment
      }
    }
  }
}
    ${WishlistFragmentFragmentDoc}`;
export type DeleteWishlistMutationFn = Apollo.MutationFunction<DeleteWishlistMutation, DeleteWishlistMutationVariables>;

/**
 * __useDeleteWishlistMutation__
 *
 * To run a mutation, you first call `useDeleteWishlistMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteWishlistMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteWishlistMutation, { data, loading, error }] = useDeleteWishlistMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteWishlistMutation(baseOptions?: Apollo.MutationHookOptions<DeleteWishlistMutation, DeleteWishlistMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteWishlistMutation, DeleteWishlistMutationVariables>(DeleteWishlistDocument, options);
      }
export type DeleteWishlistMutationHookResult = ReturnType<typeof useDeleteWishlistMutation>;
export type DeleteWishlistMutationResult = Apollo.MutationResult<DeleteWishlistMutation>;
export type DeleteWishlistMutationOptions = Apollo.BaseMutationOptions<DeleteWishlistMutation, DeleteWishlistMutationVariables>;
export const BooksDocument = gql`
    query Books {
  books {
    data {
      attributes {
        title
        synopsis
      }
    }
  }
}
    `;

/**
 * __useBooksQuery__
 *
 * To run a query within a React component, call `useBooksQuery` and pass it any options that fit your needs.
 * When your component renders, `useBooksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBooksQuery({
 *   variables: {
 *   },
 * });
 */
export function useBooksQuery(baseOptions?: Apollo.QueryHookOptions<BooksQuery, BooksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BooksQuery, BooksQueryVariables>(BooksDocument, options);
      }
export function useBooksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BooksQuery, BooksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BooksQuery, BooksQueryVariables>(BooksDocument, options);
        }
export type BooksQueryHookResult = ReturnType<typeof useBooksQuery>;
export type BooksLazyQueryHookResult = ReturnType<typeof useBooksLazyQuery>;
export type BooksQueryResult = Apollo.QueryResult<BooksQuery, BooksQueryVariables>;
export const FeaturedDocument = gql`
    query Featured {
  books(filters: {isFeatured: {eq: true}}) {
    data {
      id
      attributes {
        title
        price
        coverImageUrl
        rating
      }
    }
  }
}
    `;

/**
 * __useFeaturedQuery__
 *
 * To run a query within a React component, call `useFeaturedQuery` and pass it any options that fit your needs.
 * When your component renders, `useFeaturedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFeaturedQuery({
 *   variables: {
 *   },
 * });
 */
export function useFeaturedQuery(baseOptions?: Apollo.QueryHookOptions<FeaturedQuery, FeaturedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FeaturedQuery, FeaturedQueryVariables>(FeaturedDocument, options);
      }
export function useFeaturedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FeaturedQuery, FeaturedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FeaturedQuery, FeaturedQueryVariables>(FeaturedDocument, options);
        }
export type FeaturedQueryHookResult = ReturnType<typeof useFeaturedQuery>;
export type FeaturedLazyQueryHookResult = ReturnType<typeof useFeaturedLazyQuery>;
export type FeaturedQueryResult = Apollo.QueryResult<FeaturedQuery, FeaturedQueryVariables>;
export const BookDocument = gql`
    query Book($id: ID!) {
  book(id: $id) {
    data {
      id
      attributes {
        title
        sku
        coverImageUrl
        isOnSale
        pageCount
        userRatings
        price
        rating
        salePrice
        synopsis
        stock
        totalRatings
        authors {
          data {
            attributes {
              name
            }
          }
        }
        publisher {
          data {
            attributes {
              name
            }
          }
        }
      }
    }
  }
}
    `;

/**
 * __useBookQuery__
 *
 * To run a query within a React component, call `useBookQuery` and pass it any options that fit your needs.
 * When your component renders, `useBookQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBookQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useBookQuery(baseOptions: Apollo.QueryHookOptions<BookQuery, BookQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BookQuery, BookQueryVariables>(BookDocument, options);
      }
export function useBookLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BookQuery, BookQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BookQuery, BookQueryVariables>(BookDocument, options);
        }
export type BookQueryHookResult = ReturnType<typeof useBookQuery>;
export type BookLazyQueryHookResult = ReturnType<typeof useBookLazyQuery>;
export type BookQueryResult = Apollo.QueryResult<BookQuery, BookQueryVariables>;
export const BooksFiltersDocument = gql`
    query BooksFilters($page: Int, $pageSize: Int, $filters: BookFiltersInput, $sort: [String]) {
  books(
    filters: $filters
    sort: $sort
    pagination: {page: $page, pageSize: $pageSize}
  ) {
    data {
      id
      attributes {
        title
        price
        coverImageUrl
        rating
        authors {
          data {
            id
            attributes {
              name
            }
          }
        }
        publisher {
          data {
            id
            attributes {
              name
            }
          }
        }
      }
    }
    meta {
      pagination {
        page
        pageSize
        pageCount
        total
      }
    }
  }
}
    `;

/**
 * __useBooksFiltersQuery__
 *
 * To run a query within a React component, call `useBooksFiltersQuery` and pass it any options that fit your needs.
 * When your component renders, `useBooksFiltersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBooksFiltersQuery({
 *   variables: {
 *      page: // value for 'page'
 *      pageSize: // value for 'pageSize'
 *      filters: // value for 'filters'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useBooksFiltersQuery(baseOptions?: Apollo.QueryHookOptions<BooksFiltersQuery, BooksFiltersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BooksFiltersQuery, BooksFiltersQueryVariables>(BooksFiltersDocument, options);
      }
export function useBooksFiltersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BooksFiltersQuery, BooksFiltersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BooksFiltersQuery, BooksFiltersQueryVariables>(BooksFiltersDocument, options);
        }
export type BooksFiltersQueryHookResult = ReturnType<typeof useBooksFiltersQuery>;
export type BooksFiltersLazyQueryHookResult = ReturnType<typeof useBooksFiltersLazyQuery>;
export type BooksFiltersQueryResult = Apollo.QueryResult<BooksFiltersQuery, BooksFiltersQueryVariables>;
export const RatingsDocument = gql`
    query Ratings($bookId: ID!, $userId: ID!) {
  ratings(
    filters: {book: {id: {eq: $bookId}}, and: {user_ids: {id: {eq: $userId}}}}
  ) {
    data {
      id
      attributes {
        user_ids {
          data {
            id
          }
        }
        book {
          data {
            id
            attributes {
              userRatings
              rating
            }
          }
        }
        rating
      }
    }
  }
}
    `;

/**
 * __useRatingsQuery__
 *
 * To run a query within a React component, call `useRatingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useRatingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRatingsQuery({
 *   variables: {
 *      bookId: // value for 'bookId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useRatingsQuery(baseOptions: Apollo.QueryHookOptions<RatingsQuery, RatingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RatingsQuery, RatingsQueryVariables>(RatingsDocument, options);
      }
export function useRatingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RatingsQuery, RatingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RatingsQuery, RatingsQueryVariables>(RatingsDocument, options);
        }
export type RatingsQueryHookResult = ReturnType<typeof useRatingsQuery>;
export type RatingsLazyQueryHookResult = ReturnType<typeof useRatingsLazyQuery>;
export type RatingsQueryResult = Apollo.QueryResult<RatingsQuery, RatingsQueryVariables>;
export const WishlistDocument = gql`
    query Wishlist($id: ID!) {
  wishlist(id: $id) {
    data {
      attributes {
        ...WishlistFragment
      }
    }
  }
}
    ${WishlistFragmentFragmentDoc}`;

/**
 * __useWishlistQuery__
 *
 * To run a query within a React component, call `useWishlistQuery` and pass it any options that fit your needs.
 * When your component renders, `useWishlistQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWishlistQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useWishlistQuery(baseOptions: Apollo.QueryHookOptions<WishlistQuery, WishlistQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<WishlistQuery, WishlistQueryVariables>(WishlistDocument, options);
      }
export function useWishlistLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<WishlistQuery, WishlistQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<WishlistQuery, WishlistQueryVariables>(WishlistDocument, options);
        }
export type WishlistQueryHookResult = ReturnType<typeof useWishlistQuery>;
export type WishlistLazyQueryHookResult = ReturnType<typeof useWishlistLazyQuery>;
export type WishlistQueryResult = Apollo.QueryResult<WishlistQuery, WishlistQueryVariables>;
export const WishlistsDocument = gql`
    query Wishlists($userId: ID!) {
  wishlists(filters: {user: {id: {eq: $userId}}}) {
    data {
      id
      attributes {
        ...WishlistFragment
      }
    }
  }
}
    ${WishlistFragmentFragmentDoc}`;

/**
 * __useWishlistsQuery__
 *
 * To run a query within a React component, call `useWishlistsQuery` and pass it any options that fit your needs.
 * When your component renders, `useWishlistsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWishlistsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useWishlistsQuery(baseOptions: Apollo.QueryHookOptions<WishlistsQuery, WishlistsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<WishlistsQuery, WishlistsQueryVariables>(WishlistsDocument, options);
      }
export function useWishlistsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<WishlistsQuery, WishlistsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<WishlistsQuery, WishlistsQueryVariables>(WishlistsDocument, options);
        }
export type WishlistsQueryHookResult = ReturnType<typeof useWishlistsQuery>;
export type WishlistsLazyQueryHookResult = ReturnType<typeof useWishlistsLazyQuery>;
export type WishlistsQueryResult = Apollo.QueryResult<WishlistsQuery, WishlistsQueryVariables>;