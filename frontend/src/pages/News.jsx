import React,{useState,useEffect} from 'react'
import axios from 'axios'

let apiKey = import.meta.env.VITE_API_KEY_NEWS

export default function News() {

  let [news,setNews] = useState([])
  let [loading,setLoading] = useState(true)

  async function getNews() {
    setLoading(true)
    let res = await axios.get(
      `https://newsapi.org/v2/everything?q=Tech in India&sortBy=publishedAt&apiKey=${apiKey}`
    )
    setNews(res.data.articles)
    setLoading(false)
  }

  useEffect(()=>{
    getNews()
  },[])

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      
      <h2 className="text-center text-3xl font-bold mb-6 text-gray-800">
        Top Tech News
      </h2>

      {
        loading ? (
          <div className="flex justify-center items-center h-64">
            <h2 className="text-xl font-semibold">Loading...</h2>
          </div>
        ) : (
          <div 
            id="NewsContainer"  
            className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          > 
            {
              news.map((e,index)=>(
                <div 
                  key={index} 
                  className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col"
                >
                  <img 
                    src={e.urlToImage} 
                    alt={e.title} 
                    className="h-48 w-full object-cover"
                  />

                  <div className="p-4 flex flex-col flex-grow">
                    <h2 className="font-semibold text-lg mb-2 line-clamp-2">
                      {e.title}
                    </h2>

                    <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                      {e.description}
                    </p>

                    <p className="text-xs text-gray-500 mb-4">
                      {e.author || "Unknown"} • {new Date(e.publishedAt).toDateString()}
                    </p>

                    <a 
                      href={e.url} 
                      target="_blank"
                      className="mt-auto text-blue-600 font-medium hover:underline"
                    >
                      Read More →
                    </a>
                  </div>
                </div>
              ))
            }
          </div>
        )
      }
    </div>
  )
}
