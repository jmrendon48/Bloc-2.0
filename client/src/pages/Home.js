import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_REVIEWS } from '../utils/queries';
import ReviewList from '../components/ReviewList';

const Home = () => {
    
    // use useQuery hook to make query request
    const { loading, data } = useQuery(QUERY_REVIEWS);

    const reviews = data?.reviews || [];
    console.log(reviews);
    
    return (
        <div>
            <div class="jumbotron jumbotron-fluid">
                <div class="container banner">
                    <h1 class="display-4 banner">Welcome to Bloc <i class="fas fa-cube banner"></i></h1>
                    <p class="banner" >THE WORLD IS A LONELY PLACE AND THE ONLY HOPE OF FINDING ONESELF IS THROUGH THE SACRAMENT KNOWN AS VIDEO GAMES.</p>
                </div>
            </div>
            <div>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <ReviewList reviews={reviews}/>
            )}
            </div>
        </div>
    );
};
export default Home;