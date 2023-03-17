export default function YouTube({ id }: any) {
  return (
    <div className="container">
      <iframe
        src={`https://www.youtube.com/embed/${id}`}
        allow="autoplay; encrypted-media"
        title="Embedded YouTube video"
        className="frame"
      />
    </div>
  );
}
