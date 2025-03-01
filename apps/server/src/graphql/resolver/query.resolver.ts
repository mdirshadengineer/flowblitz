import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class QueryResolver {
  @Query(() => String)
  healthCheck(): string {
    return 'GraphQL server is running!';
  }

  @Query(() => String)
  version(): string {
    return '1.0.0';
  }
}
