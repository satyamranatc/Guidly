import React, { useState,useContext,useEffect } from "react";
import axios from "axios";
import { UserContext } from "../context/UserData";



export default function RoadMap() {

  const [roadmap, setRoadmap] = useState(null);
  const [loding, setLoding] = useState(false);

  let {token} = useContext(UserContext);


    let [user, setUser] = useState({
    id : "",
    name: "",
    email: "",
    avatar: "",
  });

  useEffect(() => {
    async function getUserData() {
      if (token.refresh_token != null)
        {
         let res = await axios.get("http://localhost:8000/api/auth/userDetails", 
          {
          "headers": {
          "Authorization": `Bearer ${token.refresh_token}`,
            },
         });
        setUser(res.data);

      }
    }
    console.log(user)
    getUserData();
  }, []);



  async function handleSubmit(e) {
    e.preventDefault();
    setLoding(true);

    const prompt = e.target.roadmap.value;

    const res = await axios.post("http://localhost:8000/api/roadmap/plan", {
      prompt,
      userId : user.id
    });

    setRoadmap(res.data);
    setLoding(false);
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Form */}
      <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <label
            htmlFor="roadmap"
            className="block text-lg font-semibold text-gray-700"
          >
            What you want to learn
          </label>

          <input
            type="text"
            id="roadmap"
            name="roadmap"
            placeholder="e.g. Python, MERN, AI"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Generate Roadmap
          </button>
        </form>
      </div>

      {/* Loading */}
      {loding && (
        <p className="text-center mt-6 text-lg font-medium text-gray-600">
          Loading roadmap...
        </p>
      )}

      {/* Output */}
      {roadmap && !loding && (
        <div className="max-w-4xl mx-auto mt-10 space-y-8">
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-2xl font-bold text-blue-600">
              {roadmap.greetings}
            </h2>

            <p className="mt-2 text-gray-700">
              {roadmap.roadmapDesc}
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-4">
            {roadmap.roadmapSteps.map((step, index) => (
              <div
                key={index}
                className="bg-white p-5 rounded-xl shadow border-l-4 border-blue-500"
              >
                <h3 className="text-xl font-semibold">
                  {step.stepTitle}
                </h3>
                <p className="text-gray-700 mt-1">
                  {step.stepDesc}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  ⏳ {step.stepEstimatedTime}
                </p>
              </div>
            ))}
          </div>

          {/* Books */}
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-xl font-bold mb-4">📚 Books</h2>
            <div className="space-y-3">
              {roadmap.resources.books.map((book, index) => (
                <div key={index} className="border-b pb-3">
                  <h3 className="font-semibold">{book.bookTitle}</h3>
                  <p className="text-sm text-gray-600">
                    {book.bookAuthor}
                  </p>
                  <p className="text-gray-700">
                    {book.bookDesc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Videos */}
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-xl font-bold mb-4">🎥 Videos</h2>
            <ul className="list-disc pl-5 space-y-2">
              {roadmap.resources.videos.map((video, index) => (
                <li key={index}>
                  <a
                    href={video}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {video}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Last words */}
          <div className="text-center text-lg font-semibold text-green-600">
            {roadmap.lastWords}
          </div>
        </div>
      )}
    </div>
  );
}
