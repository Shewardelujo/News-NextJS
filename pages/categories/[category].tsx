import NewsArticlesGrid from "@/components/NewsArticlesGrid";
import { NewsArticle, NewsResponse } from "@/models/NewsArticles";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { Alert } from "react-bootstrap";

interface CategoryNewsPageProps {
  newsArticles: NewsArticle[];
}

export const getStaticPaths: GetStaticPaths = async () => {
  //here we will return an array of the different paths available, this is only necessary because it is a dynamic url
  const categorySlugs = [
    // this could be coming from an API
    "business",
    "entertainment",
    "general",
    "health",
    "science",
    "sports",
    "technology",
  ];

  const paths = categorySlugs.map((slug) => ({ params: { category: slug } }));

  return {
    paths,
    fallback: false, // this means if we include in the url a dynamic path not included in the array above, it should return a 404
  };
};

//getStaticProps is used to load data from the server at compile time
// async (context) ... gets context as an argument, that contains the dynamic url params and we can destructure the params out of it.

export const getStaticProps: GetStaticProps<CategoryNewsPageProps> = async ({
  params,
}) => {
  const category = params?.category?.toString();
  const response = await fetch(
    `https://newsapi.org/v2/top-headlines?country=&category=${category}&apiKey=${process.env.NEWS_API_KEY}`
  );
  const newsResponse: NewsResponse = await response.json();

  return {
    props: {
      newsArticles: newsResponse.articles,
    },
    revalidate: 5 * 60, //5 minutes
  };
};

const CategoryNewsPage = ({ newsArticles }: CategoryNewsPageProps) => {
  const router = useRouter();
  const categoryName = router.query.category?.toString();

  const title = "Category: " + categoryName;
  return (
    <>
      <Head>
        <title key="title">{`${title} - NextJS News App`}</title>
      </Head>
      <main>
        <h1>{title}</h1>
        <Alert>
          This is page uses <strong>getStaticProps</strong> for very high page
          loading speed and <strong>incremental static regeneration</strong> to
          show data not older than <strong>5 minutes</strong>.
        </Alert>
        <NewsArticlesGrid articles={newsArticles}></NewsArticlesGrid>
      </main>
    </>
  );
};

export default CategoryNewsPage;
