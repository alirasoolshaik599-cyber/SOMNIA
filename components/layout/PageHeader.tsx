type PageHeaderProps = {
  title: string;
  description?: string;
};

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-white sm:text-5xl">{title}</h1>
      {description && (
        <p className="mt-4 text-lg text-slate-300 sm:mt-6 sm:text-xl">
          {description}
        </p>
      )}
    </div>
  );
}