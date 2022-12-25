import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WordleController } from './wordleController';
import { WordleService } from './wordleService';
import { config } from "./config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entity/user.entity";
import { Guess } from "./entity/guess.entity";
import { Game } from "./entity/game.entity";

@Module({
    imports: [
        // ConfigModule.forRoot({
        //     isGlobal: true,
        //     load: [config]
        // }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'rndhub.in.devexperts.com',
            port: 5432,
            username: 'dockeruser',
            password: 'dockeruser',
            database: 'wordle',
            entities: [User, Guess, Game],
            synchronize: true,
        }),
        TypeOrmModule.forFeature([User, Guess, Game])
    ],
    controllers: [WordleController],
    providers: [WordleService],
})
export class AppModule {
}
