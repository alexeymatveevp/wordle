import { Controller, Get, Param, Query, Req } from '@nestjs/common';
import { WordleService } from './wordleService';
import { LetterT } from "./make-guess";
import { Result } from "./result";

@Controller()
export class WordleController {
  constructor(private readonly wordleService: WordleService) {}

  @Get('wordle')
  async guess(@Query('guess') guess: string): Promise<Result<Array<LetterT>>> {
    return this.wordleService.guess(guess);
  }
}
