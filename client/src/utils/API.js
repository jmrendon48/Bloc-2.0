const axios = require('axios').default;
require('dotenv').config()
const client = process.env.twitch_client_id
const auth = process.env.twitch_auth

export const searchGame = (query) => {
    data = `fields age_ratings,aggregated_rating,aggregated_rating_count,alternative_names,artworks,bundles,category,checksum,collection,cover,created_at,dlcs,expanded_games,expansions,external_games,first_release_date,follows,forks,franchise,franchises,game_engines,game_modes,genres,hypes,involved_companies,keywords,multiplayer_modes,name,parent_game,platforms,player_perspectives,ports,rating,rating_count,release_dates,remakes,remasters,screenshots,similar_games,slug,standalone_expansions,status,storyline,summary,tags,themes,total_rating,total_rating_count,updated_at,url,version_parent,version_title,videos,websites;
            search "${query}"
    `
    axios({
        url: "https://api.igdb.com/v4/games",
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Client-ID': client,
            'Authorization': auth,
        },
        data: data 
      })
        .then(response => {
            console.log(response.data);
            return response
        })
        .catch(err => {
            console.error(err);
        });
}


// export const searchGame = (query) => {
//     fetch(`https://api.igdb.com/v4/games`, {
//         method: "POST",
//         headers: {
//           "Client-ID": client,
//           "Authorization": auth,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify( `
//         fields name, cover; 
//         limit 10;
//         search ${query}";
//         `)
//     }).then(function(data) {
//         return data.json()
//     })
// };

// export const searchId = (query) => {
//     fetch(`https://api.igdb.com/v4/games`, {
//         method: "POST",
//         headers: {
//           "Client-ID": client,
//           "Authorization": auth,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify( `
//         fields name, cover; 
//         limit 10;
//         search ${query}";
//         `)
//     }).then(function(data) {
//         return data.json()
//     })
// };
