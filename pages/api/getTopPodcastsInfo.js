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
const getTopPodcasts = async (country) => {
  const url = `https://rss.applemarketingtools.com/api/v2/${country}/podcasts/top/100/podcasts.json`;
  const response = await fetch(url);
  const json = await response.json();
  return json;
};

export default async function handler(req, res) {
  const resresults = await getTopPodcasts(req.query.country);
  const promises = [];
  let emails = [];
  for (let podcast of resresults.feed.results) {
    promises.push(getPodcastInfo(podcast.id).then(async (data) => {
        console.log(data.results[0].collectionName);
    if (data.results) {
      return await parser
        .parseURL(data.results[0].feedUrl)
        .then((feed) => {
            emails.push(feed.itunes?.owner.email);
          return {
            name: data.results[0].collectionName,
            email: feed.itunes?.owner.email,
            genres: data.results[0].genres,
            image: data.results[0].artworkUrl600,
          };
        });
    } else {
      return({ error: "No results found" });
    }
}));
  }
    Promise.all(promises).then((data) => {
        res.status(200).json({
            emails: emails.join(";"),
            data: data,
        });
        }
    );
}
