import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Importa aquí otros módulos necesarios 
import { ProductsModule } from './products/products.module';
import { CustomersModule } from './customers/customers.module';
import { TransactionsModule } from './transactions/transactions.module';
import { DeliveriesModule } from './deliveries/deliveries.module';
import { WompiModule } from './wompi_apis/wompi_service.module';

@Module({
  imports: [
    // Configuración global de variables de entorno
    ConfigModule.forRoot({ isGlobal: true }),
    
    // Configuración de TypeORM para conectar PostgreSQL
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST', 'localhost'),
        port: configService.get<number>('DB_PORT', 5432),
        username: configService.get<string>('DB_USERNAME', 'postgres'),
        password: configService.get<string>('DB_PASSWORD', 'password'),
        database: configService.get<string>('DB_NAME', 'wompi_db'),
        autoLoadEntities: true, // Cargar automáticamente entidades registradas
        synchronize: true, // Solo en desarrollo, no usar en producción
      }),
    }),

    // Módulos de la aplicación
    ProductsModule,
    CustomersModule,
    TransactionsModule,
    DeliveriesModule,
    WompiModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
