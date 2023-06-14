import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule } from './clients/clients.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'salao',
      password: 'salao',
      database: 'dbsalao',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Atenção: sincronização automática pode causar perda de dados em ambientes de produção
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: __dirname + '/src/schema.gql',
    }),
    ClientsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
