import { Helmet } from "react-helmet";

interface PageProps {
  children?: JSX.Element | JSX.Element[] | null;
  title?: string;
}

export default function Page({ children, title }: PageProps) {
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <div className="mx-auto">{children}</div>
    </>
  );
}
