"use client";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function NotesError({ error, reset }: Props) {
  return (
    <div style={{ padding: "16px" }}>
      <h2>Something went wrong while loading notes.</h2>
      <p>{error.message}</p>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
