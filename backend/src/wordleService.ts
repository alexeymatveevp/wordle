import { Injectable } from '@nestjs/common';
import { LetterT, makeGuess } from "./make-guess";
import { Repository } from 'typeorm';
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entity/user.entity";
import { Guess } from "./entity/guess.entity";
import { Game } from "./entity/game.entity";
import { errorResult, Result, successResult } from "./result";

const answer = "hello";

@Injectable()
export class WordleService {
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,
        @InjectRepository(Guess)
        private guessRepo: Repository<Guess>,
        @InjectRepository(Game)
        private gameRepo: Repository<Game>
    ) {
    }

    async guess(guess: string): Promise<Result<Array<LetterT>>> {
        const user = await this.userRepo.findOneBy({name: 'alex'}).catch(e => 'error');
        if (typeof user === 'string' || user === null) {
            return errorResult('No such user found');
        }
        const guesses = await this.guessRepo.findBy({
            user: {
                name: 'alex'
            }
        })
        console.log(guesses);
        if (guesses.length === 5) {
            await this.guessRepo.delete({});
            this.gameRepo.insert({
                user,
                win: false,
            });
        } else {
            if (guess === answer) {
                await this.gameRepo.insert({
                    user,
                    win: true,
                    winWord: guesses.length,
                });
                await this.guessRepo.delete({});
            } else {
                this.guessRepo.insert({
                    user,
                    guess,
                });
            }
        }
        return successResult(makeGuess(answer, guess));
    }
}
