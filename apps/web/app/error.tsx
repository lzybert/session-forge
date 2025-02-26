'use client';

const Error: React.FC<{ error: Error; reset: () => void }> = ({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) => {
  return <div className="">{error.message}
    <button onClick={reset}></button>
  </div>;
};

export default Error;
