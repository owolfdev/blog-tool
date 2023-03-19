export const YouTube: React.FC<{ id: string }> = ({ id }) => {
  const src = `https://www.youtube.com/embed/${id}`;
  return (
    <div>
      <iframe
        src={src}
        allow="autoplay; encrypted-media"
        title="Embedded YouTube video"
        width="100%"
        height="315"
        frameBorder="0"
        className="mb-4"
      />
    </div>
  );
};
