interface ErrorProps {
  message: string;
  retry?: () => void;
}

export default function Error({ message, retry }: ErrorProps) {
  return (
    <div className="bg-destructive/10 text-destructive p-4 rounded-lg">
      <p className="mb-2">{message}</p>
      {retry && (
        <button
          onClick={retry}
          className="text-sm underline hover:no-underline"
        >
          Try again
        </button>
      )}
    </div>
  );
} 