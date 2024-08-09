import { useEffect, useState } from "react";
import Loading from "./Loading";
import { getArticles } from "../../apis/DetailApi";
import { useParams } from "react-router-dom";

export default function ArticleContainer() {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const getArticle = async () => {
      try {
        const response = await getArticles(params.productId);
        // console.log(response);
        setArticles(response.data);
        setIsLoading(false);
      } catch (error) {
        return;
      }
    };

    getArticle();
  }, []);

  const openLink = (link) => {
    window.open(link);
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="h-[calc(100vh_-_264px)] flex flex-col gap-8 bg-white-1 px-[1.5rem] pt-[0.8rem] pb-[4rem] overflow-scroll">
          {articles.map((article, idx) => (
            <div
              key={idx}
              className="flex gap-4 items-center"
              onClick={() => openLink(article.url)}
            >
              <div className="flex flex-col gap-1 text-black">
                <span className="font-bold">{article.title}</span>
                <span className="text-[0.85rem] line-clamp-3">
                  {article.content}
                </span>
              </div>
              <img
                src={article.thumbnail}
                className="min-h-[70px] h-[90%] min-w-[65px] rounded bg-[#f7f7f7]"
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
