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

export default function handler(req, res) {
  getTopPodcasts(req.query.country).then(async (data) => {
    let promises = [];
    for (let result of data.feed.results) {
      promises.push(
        getPodcastInfo(result.id).then(async (data) => {
          await parser.parseURL(data.results[0].feedUrl, (err, feed) => {
            return {
              name: data.results[0].collectionName,
              email: feed.itunes?.owner.email,
              genres: data.results[0].genres,
              image: data.results[0].artworkUrl600,
            };
          });
        })
      );
    }
    Promise.all(promises).then((values) => {
      res.status(200).json(values);
    });
  });
}
