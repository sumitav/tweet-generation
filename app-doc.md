# App-Description

This submission introduces a Tweet application built with TypeScript, designed to generate tweets from employee movie reviews. The app follows a modular, extensible architecture with key components including:

## Key Components

### Services

- **TweetService**: Generates tweets based on movie reviews, ensuring adherence to formatting rules and character limits.
  
- **MovieService**: Handles movie data storage and retrieval, optimizing lookups by title.
  
- **ReviewService**: Manages review data with logging for empty reviews, ensuring transparency.

### Utility Classes

- **FileReader**: Reads JSON files with robust error handling for invalid formats or missing data.

- **StringFormatter**: Formats tweets and strings, ensuring consistent output.

## Design Choices

## Design patterns used

- Singleton Pattern: Used for the Logger configuration to ensure that only a single instance of the logger is used across the entire application. 

- Factory Pattern: Used to the service initialization process. For example, when setting up services like TweetService, MovieService, and ReviewService, the factory is responsible for creating instances of these services based on the provided data files.

- Dependency Injection: To maintain loose coupling between components. This ensures that all necessary dependencies, such as the FileService, MovieService,ReviewService,TweetService are injected into the controller at run time.

## Final Notes

The application is built with a layered architecture to separate concerns, improving readability, testability, and maintainability. Comprehensive error handling using custom exceptions and logging are incorporated throughout. 
