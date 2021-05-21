// import  React, { useState} from "react";
// import { searchGame } from "../utils/API"

// const gamePage = () => {
// 	//  const [games, setGames] = useState([]);
// 	 const [searchValue, setSearchValue] = useState("");

//     const handleFormSubmit = async (event) => {
//         event.preventDefault();

//         if(!searchValue) {return false}
    
//         try {
//           const response = await searchGame(searchValue);
    
//           if (!response.ok) {
//             throw new Error('something went wrong!');
//           }
//           const { data } = await response.json;

//           const gameData = data.map((game))


//           console.log(response)
          
//         } catch (err) {
//           console.error(err);
//         }
//       };

// 	return (
// 		<div className='container-fluid'>
//             <form id="searchValue">
//             <input value={searchValue} onchange={setSearchValue} placeholder='Type to search...'></input>
//             <button type= "submit" onSubmit={handleFormSubmit}>Submit</button>
// 			</form>
// 		</div>
// 	);
// };

// export default gamePage;