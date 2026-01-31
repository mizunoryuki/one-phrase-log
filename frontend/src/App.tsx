import { useState } from "react";
import "./App.css";
import { graphql } from "./gql";
import { useMutation, useQuery } from "@apollo/client/react";

const GET_SNIPPETS = graphql(`
  query GetSnippets {
    snippets {
      id
      content
      createdAt
      isArchived
    }
  }
`);

const CREATE_SNIPPET = graphql(`
  mutation CreateSnippet($content: String!) {
    createSnippet(content: $content) {
      id
      content
      createdAt
    }
  }
`);

const TOGGLE_IS_ARCHIVED = graphql(`
  mutation ToggleIsArchived($id: ID!) {
    toggleArchive(id: $id) {
      id
      isArchived
    }
  }
`);

function App() {
  const [inputText, setInputText] = useState("");
  const { loading, error, data } = useQuery(GET_SNIPPETS);
  const [createSnippet, { loading: isSubmitting }] =
    useMutation(CREATE_SNIPPET);
  const [toggleIsArchived] = useMutation(TOGGLE_IS_ARCHIVED);
  const handleSubimit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    try {
      await createSnippet({
        variables: { content: inputText },
        refetchQueries: [GET_SNIPPETS], // 投稿後に再取得して最新にする
      });
      setInputText("");
    } catch (err) {
      console.error("投稿エラー:", err);
    }
  };

  const handleToggleArchive = (id: string) => {
    toggleIsArchived({
      variables: { id },
      refetchQueries: [GET_SNIPPETS],
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data) return <p>No data found</p>;

  return (
    <>
      <form onSubmit={handleSubimit}>
        <textarea
          id="input-area"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          rows={4}
          cols={50}
          placeholder="Type your snippet here..."
        />
        <br />
        <button
          id="submit-button"
          type="submit"
          disabled={isSubmitting || Boolean(!inputText.trim())}
        >
          {isSubmitting ? "送信中" : "送信"}
        </button>
      </form>
      <div>
        {data.snippets.map((snippet) => (
          <div key={snippet.id} style={{ display: "flex" }}>
            <p>{snippet.content}</p>
            <input
              id={`archive-${snippet.id}`}
              name={`archive-${snippet.id}`}
              type="checkbox"
              checked={snippet.isArchived}
              onChange={() => handleToggleArchive(snippet.id)}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
