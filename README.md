# Cognitive Performance: Working Memory Testing Tool


## Overview

This application is mainly a testing tool for working memory, a major component of cognitive performance.

## Background

In late 2020, during my study at Murdoch University, my team was tasked with a conducting a study on cognitive performance. With the Covid-19 pandemic on-going, social distancing measures being aggressively enforced by the laws, and lessons 100% online (the entire team had never met each other in person at this point), the data collection phase of this research was a challenge.

The application was never a requirement of the output project, but being the only person with development skill in the team, I volunteered to deliver the obvious solution that would solve the data collection process in a very unique time of recent history.

## Tech Stack

The app is powered by [Create React App](https://github.com/facebook/create-react-app) and [Syntactically Awesome Style Sheets](https://sass-lang.com/) with deployment via Netlify. 

[![Netlify Status](https://api.netlify.com/api/v1/badges/48377308-62dc-4be5-8194-41ee7eaa8b6e/deploy-status)](https://app.netlify.com/sites/workingmemorytest/deploys)

Participant's test progress and scores are stored in React's [Context](https://reactjs.org/docs/context.html) and `localStorage`.

## The Tests

The application contains three tests:

### N-back

A sequence of numbers is progressively shown to the participant, with only the last number visible. With each new number being added, the participant is asked to identified the a number in the range `[n-3, n-1]`, hence the name, *N-Back*.

The test ends when the participant achieves the maximum score, or fail to correctly identify asked item.

### Memory Updating

Similarly to the N-Back task, the participant is progressively shown a sequence of letter. From the 4th item onwards, before a new letter is added, one of the letter in the sequence (excluding the last item, which is also the only item visible to the participant) is replaced by another. The old and new letters are informed to the partipant. The participant then has to identify `true` or `false` whether one specific letter is present in the sequence (excluding the last and the only visible item).

The test ends when the participant achieves the maximum score, or fail to correctly answer asked question.

### Corsi Block Tapping Test

In a grid of size 5x7, the participant is imitate a previously shown sequence of block being highlighted. The length of this sequence increases over time.

The test ends when the participant achieves the maximum score, or fail to correctly identify the block in the sequence.

## Environment Variable

In `.env`, change to `REACT_APP_DEBUG_MODE=true` or `REACT_APP_DEBUG_MODE=false` to run the app in debug mode, which would provide more UI information (which is standardly hidden from the participant) during the tests.

## Local Deployment

* Clone this repository locally `git clone https://github.com/JunoNgx/working-memory-test.git`
* Move into the repository director `cd working-memory-test`
* Update and install the packages `npm install`
* Run the app in development mode at [http://localhost:3000](http://localhost:3000) `npm start`
