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

function App() {
  const [inputText, setInputText] = useState("");
  const { loading, error, data } = useQuery(GET_SNIPPETS);
  const [createSnippet, { loading: isSubmitting }] =
    useMutation(CREATE_SNIPPET);

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data) return <p>No data found</p>;

  return (
    <>
      <form onSubmit={handleSubimit}>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          rows={4}
          cols={50}
          placeholder="Type your snippet here..."
        />
        <br />
        <button
          type="submit"
          disabled={isSubmitting || Boolean(!inputText.trim())}
        >
          {isSubmitting ? "送信中" : "送信"}
        </button>
      </form>
      <div>
        {data.snippets.map((snippet) => (
          <div key={snippet.id}>
            <p>{snippet.content}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
