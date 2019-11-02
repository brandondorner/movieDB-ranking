import React from "react";

const Query = () => {
    return (
        <div>
            <h1>The Movie Database </h1>
            <h4>View and rate movies of various genres and years!</h4>
            <div className="query-container">
            {/* sort by genre year rating title */}
            {/* years from here to here */}
            {/* genre year rating title all have an "all" option */}
            {/* select genre? bunch of checkboxes? */}
            {/* limit results */}
            {/* search/submit button */}
                <form action="/submit" method="POST">
                    <input name="title-search" placeholder="Search Title"></input>
                    <label>Sort By:</label>
                    <select name="sortBy">
                        <option value='none'>None</option>
                        <option value="title">Title</option>
                        <option value="genres">Genres</option>
                        <option value="movie_year">Year</option>
                    </select>
                    <label> Limit results to:</label>
                    <input type="number" name="limit" value="100" placeholder="100"/>
                    <label>From year</label>
                    <input type="number" name="year1" value="1972" placeholder="1972"/>
                    <label>to year</label>
                    <input type="number" name="year2" value="1996" placeholder="1996"/>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Query