import "./App.css";
import {  graphql } from './gql';
import { useQuery } from "@apollo/client/react";

const GET_SNIPPETS = graphql(`
  query GetSnippets {
    snippets {
      id
      content
      createdAt
    }
  }
`);

function App() {
  const { loading, error, data} = useQuery(GET_SNIPPETS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data) return <p>No data found</p>;

  return (
    <div>
      {data.snippets.map((snippet) => (
        <div key={snippet.id}>
          <p>{snippet.content}</p>
        </div>
      ))}
    </div>
  )
}

export default App;
