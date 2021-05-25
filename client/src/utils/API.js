import env from "react-dotenv";

const client = env.twitch_client_id
const auth = env.twitch_auth

export const searchGame = (query) => {
    const dataSearch = ` fields age_ratings,aggregated_rating,aggregated_rating_count,alternative_names,artworks,bundles,category,checksum,collection,cover,created_at,dlcs,expanded_games,expansions,external_games,first_release_date,follows,forks,franchise,franchises,game_engines,game_modes,genres,hypes,involved_companies,keywords,multiplayer_modes,name,parent_game,platforms,player_perspectives,ports,rating,rating_count,release_dates,remakes,remasters,screenshots,similar_games,slug,standalone_expansions,status,storyline,summary,tags,themes,total_rating,total_rating_count,updated_at,url,version_parent,version_title,videos,websites;
    limit 1;
    search"${query}";`
    return fetch(`https://cors-anywhere.herokuapp.com/https://api.igdb.com/v4/games`, {
        method: "POST",
        headers: {
            "Content-Type": 'application/json',
            "Client-ID": client,
            "Authorization": auth,
            // "Client-ID": 'w6k0p7kqfipr0j3xuj55q2z85vrs57',
            // "Authorization": 'Bearer 1cv3ma8y8rj7im3gm6sb8izgzsycox',
        },
        body: dataSearch
    })
}