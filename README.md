# 99movies 🎬

At 99designs by Vista, we love lots of things. Great design, great coffee, great code, and when it comes time to unwind… great movies.

We want to share our enthusiasm for movies with our customers, and have decided to write a program to read in movie reviews that our employees have written, and then compose "tweets" that we can share through our company account.

This test is not timed — you can take as long as you like but it is intended to take no more than a couple of hours.  You should feel free to use any programming style that you feel comfortable with as long as it meets the requirements listed below.

If you have any questions about this coding test please feel free to get in touch.

## Files

We provide you with the following files:

- `reviews.json` — captured via an online survey tool, this file has the list of all new employee reviews we have yet to tweet about.
- `movies.json` — this file contains a list of the movies we've watched, and information about that movie.
- `tests.json` — this file contains a list of expected output "tweets", see the **Testing** section below for more details.

## Requirements

We require you to write a command line application written in one of Go, Typescript, PHP, Javascript, Ruby, or Python that meets the following requirements.

The application must be run with 2 positional arguments:

1. A JSON file containing review data in the same format as `reviews.json`.
2. A JSON file containing movie data in the same format as `movies.json`.

An example of how to run a Go version of this application might look like:

```
go run main.go reviews.json movies.json
```

For each review in the input review data, output a "tweet" of that review, which should follow these rules:

- Tweets should follow the format `Movie Title (year): Review of the movie ★★★★½`
- If the year cannot be found, it should be omitted
- Tweets may not have more than 140 characters
- If the tweet would go over this limit, the movie title should be trimmed to 25 characters
- If the tweet is still over the limit, then the review text should be shortened too until the tweet is exactly 140 characters
- The score should be presented as Unicode stars (★), using a "five star rating" with halves (½)

## Getting Started

Create a directory to work on your project. Copy `99d-by-vista-coding-test.tar.gz` into the directory and extract using `tar -xzpf 99d-by-vista-coding-test.tar.gz`.

We have provided `tests.json` as a reference for what the provided reviews should ouput.  You may use this in your own test cases if you want, but feel free to create your own test data.

From here you can structure your application however you like in order to meet the requirements listed above.

## Testing

We expect your submission to include a suite of test cases to test the application's functionality.  These can be structured however you like as appropriate for the technology you choose.  At a minimum you should aim to test all requirements described above.

We provide a `tests.json` file for your reference that contains a list of expected outputs for the provided `reviews.json` and `movies.json` inputs.  You are not required to use this file in your testing, but may do so if you find it useful.

## What to Deliver

- An application meets the above requirements, and passes all written test cases.

- Documentation for running the application, and for running any test cases.

- Documentation that provides a high-level summary of the code you have written, any important choices you made, as well as any other notes you wish to share.  Keep it brief (no more than 2 paragraphs, around 100-200 words) - if you are familiar with GitHub Pull Requests, treat this as a "Pull Request description" for the submitted code.

Accompanying documentation can be a plain text, markdown, or any simple-to-read file format you choose. Add it to the root of the project, so it is part of the submitted tar file (see below).

## Submitting

In your project directory, run:

```
tar -cvzf 99d-by-vista-coding-test.tar.gz .
```

Then email the created `tar.gz` file back to the person who sent you the test.

In order for all applicants to be reviewed fairly and confidentially, please do not include your name or any other identifying information in your submission.  You can hide your identity in git by running the following commands inside your solution's repository before any other commits:

```
git config user.name "99designs Applicant"

git config user.email user@example.com
```

## What We Are Looking For

When coding, you should aim for:

- Clean, readable code.
- Solid testing approach — we expect a suite of test cases that cover a variety of edge cases.
- Production quality — e.g. imagine this is a core part of a larger codebase that you maintain with your product team.
- Using Git for source control:
  - Try and commit small changes; this helps us see your approach and workflow.
  - Make sure you include the `.git` directory in the packaged .tar.gz file you send back.

We will be interested in your approach to the problem, and what methods you use, almost as much as the final result.

We are not looking for perfect, idiomatic code, especially if the language you chose is not your primary programming language.

There are no tricks or nasty surprises in the test. Just write good, solid code to solve the few requirements.

## Do Not Republish

Please do not publish our test, or your solution publicly. We do not want applicants to see other test submissions, or have access to our test.
