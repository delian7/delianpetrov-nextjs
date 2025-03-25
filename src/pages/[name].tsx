import { GetServerSideProps } from "next";
import Head from "next/head";

interface NotionData {
  title: string;
  description: string;
  image: string;
}

export default function DynamicPage({ notionData }: { notionData: NotionData }) {
  if (!notionData) {
    return <div>Redirecting...</div>;
  }

  return (
    <>
      <Head>
        <title>{notionData.title}</title>
        <meta property="og:title" content={notionData.title} />
        <meta property="og:description" content={notionData.description} />
        <meta property="og:image" content={notionData.image} />
      </Head>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { name } = context.params!;
  const notionData = await fetchNotionData(name as string);

  if (!notionData) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    redirect: {
      destination: notionData.url, // Redirect to the URL from Notion data
      permanent: false,
    },
  };
};

async function fetchNotionData(name: string) {
  const response = await fetch(`https://qpqyy5wg42qcon34ph6mhljct40wtmpl.lambda-url.us-east-2.on.aws/?name=${name}`);
  const data = await response.json();

  if (!data["url"]) {
    return null;
  }

  return data;
}
