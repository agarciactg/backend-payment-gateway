import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';
import { WompiService } from './wompi_service.service';
import { TokenizeCardDto } from './dto/tokenizer-card';
import { CreateTransactionDto } from './dto/create-transaction-w';

@ApiTags('Wompi')
@Controller('wompi')
export class WompiController {
  constructor(private readonly wompiService: WompiService) {}

  // 1. Tokenizar tarjeta
  @Post('tokenize-card')
  @ApiOperation({ summary: 'Tokeniza una tarjeta de crédito/débito' })
  @ApiBody({ type: TokenizeCardDto })
  async tokenizeCard(@Body() cardDetails: TokenizeCardDto) {
    return this.wompiService.tokenizeCard(cardDetails);
  }

  // 2. Obtener token de aceptación
  @Get('acceptance-token')
  @ApiOperation({ summary: 'Obtiene el token de aceptación del comercio' })
  async getAcceptanceToken() {
    return this.wompiService.getAcceptanceToken();
  }

  // 3. Crear transacción
  @Post('create-transaction')
  @ApiOperation({ summary: 'Crea una transacción de pago con Wompi' })
  @ApiBody({ type: CreateTransactionDto })
  async createTransaction(@Body() transactionDetails: CreateTransactionDto) {
    const {
      reference,
      amountInCents,
      currency,
      cardToken,
      installments,
      acceptanceToken,
    } = transactionDetails;

    const payload = {
      amount_in_cents: amountInCents,
      currency,
      customer_email: transactionDetails.customerEmail,
      payment_method: {
        type: 'CARD',
        token: cardToken,
        installments,
      },
      reference,
      acceptance_token: acceptanceToken,
    };

    return this.wompiService.createTransaction(payload);
  }

  // 4. Obtener detalle de transacción
  @Get('transactions/:id')
  @ApiOperation({ summary: 'Obtiene los detalles de una transacción por su ID' })
  @ApiParam({ name: 'id', description: 'ID de la transacción' })
  async getTransactionDetails(@Param('id') transactionId: string) {
    return this.wompiService.getTransactionDetails(transactionId);
  }
}
