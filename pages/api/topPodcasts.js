// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const fetch = require("node-fetch");
const getTopPodcasts = async (country) => {
  const url = `https://rss.applemarketingtools.com/api/v2/${country}/podcasts/top/100/podcasts.json`;
  const response = await fetch(url);
  const json = await response.json();
  return json;
};

export default async function handler(req, res) {
  await getTopPodcasts(req.query.country).then(async (data) => {
    res.status(200).json(data.feed.results);
  });
}
