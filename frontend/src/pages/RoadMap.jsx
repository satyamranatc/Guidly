import React,{useEffect,useState} from 'react'
import axios from 'axios'

export default function RoadMap() {

  let [roadmap,setRoadmap] = useState(null);

  async function handleSubmit(e)
  {
    e.preventDefault();
    let roadmap = e.target[0].value;
    console.log(roadmap);
    let res = await axios.post("http://localhost:8000/api/roadmap/plan", {
      "prompt": roadmap
    });
    setRoadmap(res.data);
    console.log(res.data);
  }


/*
greetings
: 
"Namaste, future Python wizard!"
lastWords
: 
"Go forth, learn, build, and conquer the Python world! Your career will be brighter than a Diwali cracker!"
resources
: 
books
: 
Array(3)
0
: 
bookAuthor
: 
"Eric Matthes"
bookDesc
: 
"An excellent hands-on guide for beginners to quickly get up to speed with Python and build projects."
bookTitle
: 
"Python Crash Course, 2nd Edition: A Hands-On, Project-Based Introduction to Programming"
[[Prototype]]
: 
Object
1
: 
{bookTitle: 'Automate the Boring Stuff with Python, 2nd Edition: Practical Programming for Total Beginners', bookAuthor: 'Al Sweigart', bookDesc: 'Perfect for learning practical Python applications…o automate tasks, making your daily life simpler.'}
2
: 
{bookTitle: 'Fluent Python: Clear, Concise, and Effective Programming', bookAuthor: 'Luciano Ramalho', bookDesc: 'For those who want to deepen their understanding o…thon and write more idiomatic and efficient code.'}
length
: 
3
[[Prototype]]
: 
Array(0)
videos
: 
(3) ['https://www.youtube.com/watch?v=rfscVS0vtbw', 'https://www.youtube.com/watch?v=YYXdXT2GgqM', 'https://www.youtube.com/playlist?list=PL-osiE80TeTt2d9bfVyTiXJAiUGgOp72W']
[[Prototype]]
: 
Object
roadmapDesc
: 
"Python isn't just a language, it's a superpower! This roadmap will guide you from the basics to becoming a sought-after professional, faster than you can say 'chai'!"
roadmapSteps
: 
Array(6)
0
: 
stepDesc
: 
"Start with the absolute essentials: variables, data types, loops, functions, and object-oriented programming (OOP) concepts. Build a strong base, just like we build our relationships – solid and long-lasting! No shortcut like a 'jugaad' here, just good old learning!"
stepEstimatedTime
: 
"45 days"
stepTitle
: 
"Mastering Python Fundamentals"
[[Prototype]]
: 
Object
1
: 
{stepTitle: 'Pick Your Python Playground', stepDesc: "Python is versatile, like an Indian thali! Decide …Don't just follow the crowd, follow your passion!", stepEstimatedTime: '15 days'}
2
: 
{stepTitle: "'Haath-Mein-Kaam' - Practical Projects", stepDesc: 'Theory is good, but practical application is where…ld start looking like a portfolio of your skills!', stepEstimatedTime: '60 days'}
3
: 
{stepTitle: 'Deep Dive into Frameworks & Libraries', stepDesc: 'Once you have basic projects, dive deeper into the… your power tools to build bigger, better things!', stepEstimatedTime: '75 days'}
4
: 
{stepTitle: 'Communication, Community & Collaboration', stepDesc: "It's not just about coding; it's about connecting!…! And remember, a good 'namaste' goes a long way.", stepEstimatedTime: '30 days'}
5
: 
{stepTitle: 'Ace Interviews & Land Your Dream Role', stepDesc: 'Polish your resume, create a strong LinkedIn profi…work will surely pay off with a rewarding career!', stepEstimatedTime: '45 days'}
length
: 
6
[[Prototype]]
: 
Array(0)
roadmapTitle
: 
"Your Python Padhai se Placement Tak ka Safar!"
_id
: 
"6954f1aa8bb64ce97f70ffad"

*/


  return (
    <div>
      <div id = "roadmapForm">
        <form onSubmit={handleSubmit} >
          <label for="roadmap">What You Want To Learn:</label>
          <input type="text" placeholder='What You Want To Learn' id="roadmap" name="roadmap"></input>
          <button type="submit">Submit</button>
        </form>
      </div>
      <div id="Ouput">
        {
          roadmap!=null ?<>
          <div>
            <h2>{roadmap.greetings}</h2>
            <p>{roadmap.roadmapDesc}</p>
            {roadmap.roadmapSteps.map((step) => {
              <div className="Step">
                <h3>{step.stepTitle}</h3>
                <p>{step.stepDesc}</p>
                <p>{step.stepEstimatedTime}</p>
              </div>
            })}
            <h2>Books:</h2>
            {
              roadmap.resources.books.map((book) => {
                <div className="Book">
                  <h3>{book.bookTitle}</h3>
                  <p>{book.bookAuthor}</p>
                  <p>{book.bookDesc}</p>
                </div>
              })
            }
            <h2>Videos:</h2>
            {
              roadmap.resources.videos.map((video) => {
                <div className="Video">
                  <p>{video}</p>
                </div>
              })
            }

            <h2>{roadmap.lastWords}</h2>
          </div>
          </>:null
        }
      </div>
    </div>
  )
}
