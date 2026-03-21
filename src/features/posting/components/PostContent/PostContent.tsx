type PostContentProps = {
  content: string;
};

export function PostContent({ content }: PostContentProps) {
  const paragraphs = content
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <article className="max-w-3xl mx-auto w-full px-4 md:px-6 py-10">
      <div className="flex flex-col gap-5">
        {paragraphs.map((p, idx) => (
          <p key={idx} className="font-serif text-base-content/90 text-base md:text-lg leading-relaxed">
            {p}
          </p>
        ))}
      </div>
    </article>
  );
}
