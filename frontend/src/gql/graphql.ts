/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Mutation = {
  __typename?: 'Mutation';
  createSnippet: Snippet;
  toggleArchive: Snippet;
  updateSnippet: Snippet;
};


export type MutationCreateSnippetArgs = {
  content: Scalars['String']['input'];
};


export type MutationToggleArchiveArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateSnippetArgs = {
  content: Scalars['String']['input'];
  id: Scalars['ID']['input'];
};

export type Query = {
  __typename?: 'Query';
  snippets: Array<Snippet>;
};

export type Snippet = {
  __typename?: 'Snippet';
  content: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isArchived: Scalars['Boolean']['output'];
};

export type GetSnippetsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSnippetsQuery = { __typename?: 'Query', snippets: Array<{ __typename?: 'Snippet', id: string, content: string, createdAt: string }> };


export const GetSnippetsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSnippets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"snippets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<GetSnippetsQuery, GetSnippetsQueryVariables>;