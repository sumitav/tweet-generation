## Test Documentation
The application is thoroughly tested using Jest, covering various edge cases and core functionalities to ensure correctness and robustness.

## Test Scenarios:

## Valid Reviews and Movies Data

- Description: Both reviews.json and movies.json have well-structured and valid data.
- Expected Behavior: The application generates tweets adhering to the defined format (Movie Title (year): Review of the movie ★★★★½).

- Description: The reviews.json file is completely empty (i.e., []).
- Expected Behavior: No tweets should be generated, and an appropriate log message should be displayed.

- Description: The movies.json file is completely empty (i.e., []).
- Expected Behavior: The application should still generate the output.json file inside the output folder, with a log warning about the absence of movie data.


- Description: There are duplicate entries in either reviews.json or movies.json.
- Expected Behavior: The application processes the latest instance of duplicate reviews or movie entries and uses that for tweet generation, discarding earlier duplicates.

- Description: Some reviews, combined with the movie title and year, exceed 140 characters.
- Expected Behavior: The application should truncate the movie title to 25 characters and shorten the review text while ensuring the tweet fits within the character limit.


-  Description: A movie in movies.json does not have a year.
-  Expected Behavior: The tweet should exclude the year but still follow the tweet format (Movie Title: Review of the movie ★★★★½).

These unit tests ensure that the application handles normal conditions as well as edge cases like missing or empty data, duplicates, and character limit constraints efficiently, all while logging appropriate messages for transparency.