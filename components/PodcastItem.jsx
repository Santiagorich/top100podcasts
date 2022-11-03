import React from 'react'

// {
//   "artistName": "Mel Robbins",
//   "id": "1646101002",
//   "name": "The Mel Robbins Podcast",
//   "kind": "podcasts",
//   "artworkUrl100": "https://is1-ssl.mzstatic.com/image/thumb/Podcasts112/v4/be/73/9e/be739e05-fb11-403d-d8b5-ccda72d50785/mza_12168290504345307766.jpg/100x100bb.png",
//   "genres": [
//       {
//           "genreId": "1304",
//           "name": "Education",
//           "url": "https://itunes.apple.com/ca/genre/id1304"
//       },
//       {
//           "genreId": "1512",
//           "name": "Health & Fitness",
//           "url": "https://itunes.apple.com/ca/genre/id1512"
//       }
//   ],
//   "url": "https://podcasts.apple.com/ca/podcast/the-mel-robbins-podcast/id1646101002"
// }
// Style with Tailwind CSS
function PodcastItem({ podcast }) {
  return (
    <div className="flex flex-col items-center justify-center w-1/2 p-4">
      <img
        className="w-32 h-32 rounded-full"
        src={podcast.artworkUrl100}
        alt={podcast.name}
      />
      <h3 className="mt-4 text-xl font-bold">{podcast.name}</h3>
      <p className="mt-2 text-gray-600">{podcast.artistName}</p>
    </div>
  )
}

export default PodcastItem