import Head from "next/head";

type Props = {
  title: string;
  content: string;
  pageSlug?: string;
};

export default function CustomHead({ title, content, pageSlug }: Props) {
  const ogTitle = title.replace(" - Sportbase", "");
  const pageURL = `https://sportbase.netlify.app${pageSlug}`;

  return (
    <Head>
      <title>Sportbase - {title}</title>
      <meta name="description" content={content} />
      <link rel="canonical" href={pageURL} />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={content} />
      <meta property="og:url" content={pageURL} />
    </Head>
  );
}
