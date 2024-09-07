"use client";
import { useEffect, useState } from "react";

export default function News() {
  const [news, setNews] = useState([]);
  const [aritcalNum, setAritcalNum] = useState(3);

  useEffect(() => {
    fetch("https://saurav.tech/NewsAPI/top-headlines/category/business/us.json")
      .then((res) => res.json())
      .then((data) => {
        setNews(data.articles);
      });
  }, []);

  return (
    <div className=" text-gray-700 space-y-3 bg-gray-100 rounded-xl mt-5 p-4">
      <h4 className=" font-bold text-xl px-4">Whats happening</h4>
      {news.slice(0, aritcalNum).map((articel) => (
        <h3 key={articel.url}>
          <a href={articel.url} target="blank">
            <div className=" flex items-center justify-between px-4 py-2 space-x-1 hover:bg-gray-200 transition-all duration-200 rounded ">
              <div className=" space-y-0.5">
                <h6 className=" text-sm font-bold">{articel.title}</h6>
                <p className=" text-xs font-medium text-gray-500">
                  {articel.source.name}
                </p>
              </div>
              <img
                className=" rounded-xl"
                src={articel.urlToImage}
                width={70}
              />
            </div>
          </a>
        </h3>
      ))}
      <button
        onClick={() => setAritcalNum(aritcalNum + 3)}
        className=" text-sm pl-4 pb-3 text-blue-500 hover:text-blue-300 transition-all duration-200">
        Load more
      </button>
    </div>
  );
}
