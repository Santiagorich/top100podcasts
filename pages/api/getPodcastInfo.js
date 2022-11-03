// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const fetch = require("node-fetch");
const Parser = require("rss-parser");
const parser = new Parser();

const getPodcastInfo = async (id) => {
  const url = `https://itunes.apple.com/lookup?id=${id}`;
  const response = await fetch(url);
  const json = await response.json();
  return json;
};

export default async function handler(req, res) {
  const data = await getPodcastInfo(req.query.id);
  if (data.results) {
    const feed = await parser.parseURL(data.results[0].feedUrl);
    res.status(200).json({
      name: data.results[0].collectionName,
      email: feed.itunes?.owner.email,
      genres: data.results[0].genres,
      image: data.results[0].artworkUrl600,
    });
  } else {
    res.status(200).json({ error: "No results found" });
  }
}
