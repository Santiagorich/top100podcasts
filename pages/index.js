const getStaticProps = async () => {
  const res = await fetch("http://localhost:3000/api/topPodcasts?country=us");
  const data = await res.json();
  return {
    props: { podcasts: data },
    revalidate: 120,
  };
};

export default function Home({ podcasts }) {
  return (
    <div>
      <h1>Top 100 Podcasts</h1>
      <div className="flex flex-wrap justify-center">
        {podcasts && podcasts.map((podcast) => (
          <PodcastItem key={podcast.id} podcast={podcast} />
        ))}
      </div>
    </div>
  );
}
