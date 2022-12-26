# Wordle game
Hey, as our practical task we'll implement a [Wordle Game](https://wordlegame.org/)

Go check it out if you don't know it - pretty fun game

Click on the `?` in top-right corner to learn the rules

## Part 1 - Logic
It is a good idea to make programs like this:
- describe a model (in TypeScript)
- create core functions and their signatures
- write tests that describe the behavior of this model
- write code of the functions

So this is exactly how we'll proceed

## Model and core functions
We already described you a model in these files in `src` folder
- `make-guess.ts` - describes core function of the game and it's signature
- `word-exists.ts` - function to check word validity
- `wordle-game.ts` - the game object description and it's API

Read the files and try to understand how it should work all together

## Tests
The tests for the these functions are in corresponding `*.spec.ts` files

Your task would be to fix all test - this approach is called "test driven development" or TDD

Another task is to think about more tests.
We've covered only **about 30%** of all possible cases.
There are "corner cases" that are tricky and should be handled.
Try to find all possible corner cases.

# Implementation
During thinking about tests and corner cases - start implementing the code

Use the power of TypeScript and rely on compiler errors

**DO NOT** change the original model, unless you absolutely need to.
We will most rather rely on this model in future tasks

### Helpful Links
Use this [wordle solver](https://wordlegame.org/wordle-solver) to check your solutions

Also, the link to dictionary of [english words](https://github.com/lorenbrichter/Words/blob/master/Words/en.txt)