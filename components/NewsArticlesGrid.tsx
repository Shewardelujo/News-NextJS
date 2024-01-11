import { NewsArticle } from "@/models/NewsArticles";
import NewsArticleEntry from "./NewsArticleEntry";
import { Row, Col } from "react-bootstrap";

interface NewsArticlesGridProps {
  articles: NewsArticle[];
}

const NewsArticlesGrid = ({ articles }: NewsArticlesGridProps) => {
  return (
    <Row xs={1} sm={2} sl={3} className="g-4 ">
      {articles.map((article) => (
        <Col key={article.url}>
          <NewsArticleEntry article={article} />
        </Col>
      ))}
    </Row>
  );
};

export default NewsArticlesGrid;
