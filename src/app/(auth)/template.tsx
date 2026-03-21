type TemplateProps = Readonly<{
  children: React.ReactNode;
}>;

export default function Template({ children }: TemplateProps) {
  return <main className="min-h-screen bg-base-100 text-base-content flex flex-col">{children}</main>;
}
