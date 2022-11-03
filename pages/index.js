import { useEffect, useState } from "react";
import PodcastItem from "./../components/PodcastItem";

const getStaticProps = async () => {
  const res = await fetch("/api/topPodcasts?country=us");
  const data = await res.json();
  return {
    props: { data },
    revalidate: 120,
  };
};

export default function Home({ data }) {
  const [podcasts, setPodcasts] = useState(null);
  const [emailString, setEmailString] = useState("");
  useEffect(() => {
    console.log(data);
    if (!data) {
      const res = fetch("/api/topPodcasts?country=us")
        .then((res) => res.json())
        .then((data) => setPodcasts(data));
    }
  }, []);
  return (
    <div className="flex flex-col gap-2">
      <h1>Top 100 Podcasts</h1>
      <button
        onClick={() => {
          let promises = [];
          for (let podcast of podcasts) {
            fetch(
              `http://localhost:3000/api/getPodcastInfo?id=${podcast.id}`
            ).then((res) => res.json()).then((data) => {
              console.log(data.email);
              setEmailString((prev) => prev + data.email + ";");
            });
          }
        }}
      >
        Show all emails
      </button>
      <input type="text"  value={emailString} />
      <div className="flex flex-wrap justify-center">
        {podcasts &&
          podcasts.map((podcast) => (
            <PodcastItem key={podcast.id} podcast={podcast} />
          ))}
      </div>
    </div>
  );
}
