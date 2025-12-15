"use client";

type Props = {
  error: Error;
};

const NoteDetailsError = ({ error }: Props) => {
  return <p>Could not fetch note details. {error.message}</p>;
};

export default NoteDetailsError;