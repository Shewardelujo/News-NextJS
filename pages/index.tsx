import NewsArticleEntry from "@/components/NewsArticleEntry";
import NewsArticlesGrid from "@/components/NewsArticlesGrid";
import { NewsArticle, NewsResponse } from "@/models/NewsArticles";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { Alert } from "react-bootstrap";

interface BreakingNewsPageProps {
  newsArticles: NewsArticle[];
}

//getServerSideProps is used to load data from the server when the page loads
export const getServerSideProps: GetServerSideProps<
  BreakingNewsPageProps
> = async () => {
  const response = await fetch(
    "https://newsapi.org/v2/top-headlines?country=us&apiKey=" +
      process.env.NEWS_API_KEY
  );
  const newsResponse: NewsResponse = await response.json();

  return {
    props: {
      newsArticles: newsResponse.articles,
    },
  };
};

//process.env.NEWS_API_KEY

//the only way that this will be visible on the client side even if it is within the html tag is if we prepend it with NEXT_PUBLIC, as in below

//process.env.NEXT_PUBLIC_NEWS_API_KEY
//this is because process.env.NEWS_API_KEY as a security mechanism that prevents us from mistakenly exposing the key on the frontend

export default function BreakingNewsPage({
  newsArticles,
}: BreakingNewsPageProps) {
  return (
    <>
      <Head>
        <title key="title">Breaking News - NextJS News App</title>
      </Head>
      <main>
        <h1>Breaking News </h1>
        <Alert>
          This page uses <strong>getServerSideProps</strong> to fetch data
          server-side on every request. This allows search engines to crawl the
          page content and <strong>improves SEO</strong>.
        </Alert>
        <NewsArticlesGrid articles={newsArticles} />
      </main>
    </>
  );
}
