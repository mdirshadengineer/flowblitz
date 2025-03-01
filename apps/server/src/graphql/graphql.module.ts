import { Module } from '@nestjs/common';
import { GraphQLModule as NestGraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { DatabaseService } from '../database/database.service';
import { DatabaseResolver } from './resolver/database.resolver';
import { CoreModule } from 'src/core/core.module';
import { QueryResolver } from './resolver/query.resolver';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { GraphQLError } from 'graphql';

@Module({
  imports: [
    CoreModule, // Import CoreModule for logging and error handling
    NestGraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      introspection: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      formatError: (error: GraphQLError) => {
        console.log(error);
        return error;
      }
    })
  ],
  providers: [DatabaseService, DatabaseResolver, QueryResolver]
})
export class GraphqlModule {}
