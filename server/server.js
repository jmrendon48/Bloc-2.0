const express = require('express');
require('dotenv').config();
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const fetch = require('node-fetch');
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');
const db = require('./config/connection');
const client = process.env.twitch_client_id
const auth = process.env.twitch_auth

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});

server.applyMiddleware({ app });

// functions for api search 
const searchGame = (query) => {
  const dataSearch = ` fields age_ratings,aggregated_rating,aggregated_rating_count,alternative_names,artworks,bundles,category,checksum,collection,cover,created_at,dlcs,expanded_games,expansions,external_games,first_release_date,follows,forks,franchise,franchises,game_engines,game_modes,genres,hypes,involved_companies,keywords,multiplayer_modes,name,parent_game,platforms,player_perspectives,ports,rating,rating_count,release_dates,remakes,remasters,screenshots,similar_games,slug,standalone_expansions,status,storyline,summary,tags,themes,total_rating,total_rating_count,updated_at,url,version_parent,version_title,videos,websites;
  limit 7;
  search"${query}";`
  return fetch(`https://api.igdb.com/v4/games`, {
    method: "POST",
    headers: {
      "Content-Type": 'application/json',
      "Client-ID": client,
      "Authorization": auth,
    },
    body: dataSearch
  })
}
const getCover = (query) => {
  let link = ""
  const dataSearch = `fields *; where id = ${query};`;
  return fetch(`https://api.igdb.com/v4/covers`, {
    method: "POST",
    headers: {
      "Content-Type": 'application/json',
      "Client-ID": client,
      "Authorization": auth,
    },
    body: dataSearch
  })

}
//function end

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve up static assets
app.use('/images', express.static(path.join(__dirname, '../client/images')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

//route to search and get cover art
app.get('/test/:query', async (req, res) => {
  const test = req.params.query
  const data = await searchGame(test).then(res => res.json())
  console.log(data)
  res.json(data)
})
app.get('/rest/:query', async (req, res) => {
  const test = req.params.query
  const data = await getCover(test).then(res => res.json())
  console.log("111111111111111111111111111111111111111111111111111",data)
  res.json(data)
})
// end of route to search and get cover art
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});