require('dotenv').config()
const client = process.env.twitch_client_id
const auth = process.env.twitch_auth

export const searchGame = (query) => {
    fetch(`https://api.igdb.com/v4/games`, {
        method: "POST",
        headers: {
          "Client-ID": client,
          "Authorization": auth,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify( `
        fields name, cover; 
        limit 10;
        search ${query}";
        `)
    }).then(function(data) {
        return data.json()
    })
};

export const searchId = (query) => {
    fetch(`https://api.igdb.com/v4/games`, {
        method: "POST",
        headers: {
          "Client-ID": client,
          "Authorization": auth,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify( `
        fields name, cover; 
        limit 10;
        search ${query}";
        `)
    }).then(function(data) {
        return data.json()
    })
};
