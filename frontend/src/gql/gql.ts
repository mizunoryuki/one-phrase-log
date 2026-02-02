/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  query GetSnippets {\n    snippets {\n      id\n      content\n      createdAt\n      isArchived\n    }\n  }\n": typeof types.GetSnippetsDocument,
    "\n  mutation CreateSnippet($content: String!) {\n    createSnippet(content: $content) {\n      id\n      content\n      createdAt\n    }\n  }\n": typeof types.CreateSnippetDocument,
    "\n  mutation ToggleIsArchived($id: ID!) {\n    toggleArchive(id: $id) {\n      id\n      isArchived\n    }\n  }\n": typeof types.ToggleIsArchivedDocument,
    "\n  mutation DeleteSnippet($id: ID!) {\n    deleteSnippet(id: $id)\n  }\n": typeof types.DeleteSnippetDocument,
};
const documents: Documents = {
    "\n  query GetSnippets {\n    snippets {\n      id\n      content\n      createdAt\n      isArchived\n    }\n  }\n": types.GetSnippetsDocument,
    "\n  mutation CreateSnippet($content: String!) {\n    createSnippet(content: $content) {\n      id\n      content\n      createdAt\n    }\n  }\n": types.CreateSnippetDocument,
    "\n  mutation ToggleIsArchived($id: ID!) {\n    toggleArchive(id: $id) {\n      id\n      isArchived\n    }\n  }\n": types.ToggleIsArchivedDocument,
    "\n  mutation DeleteSnippet($id: ID!) {\n    deleteSnippet(id: $id)\n  }\n": types.DeleteSnippetDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetSnippets {\n    snippets {\n      id\n      content\n      createdAt\n      isArchived\n    }\n  }\n"): (typeof documents)["\n  query GetSnippets {\n    snippets {\n      id\n      content\n      createdAt\n      isArchived\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateSnippet($content: String!) {\n    createSnippet(content: $content) {\n      id\n      content\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  mutation CreateSnippet($content: String!) {\n    createSnippet(content: $content) {\n      id\n      content\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ToggleIsArchived($id: ID!) {\n    toggleArchive(id: $id) {\n      id\n      isArchived\n    }\n  }\n"): (typeof documents)["\n  mutation ToggleIsArchived($id: ID!) {\n    toggleArchive(id: $id) {\n      id\n      isArchived\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteSnippet($id: ID!) {\n    deleteSnippet(id: $id)\n  }\n"): (typeof documents)["\n  mutation DeleteSnippet($id: ID!) {\n    deleteSnippet(id: $id)\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;