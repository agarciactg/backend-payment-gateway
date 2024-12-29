import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class WompiService {
    private readonly apiBaseUrl = 'https://api-sandbox.co.uat.wompi.dev/v1';
    private readonly publicKey = 'pub_stagtest_g2u0HQd3ZMh05hsSgTS2lUV8t3s4mOt7';
    private readonly privateKey = 'prv_stagtest_5i0ZGIGiFcDQifYsXxvsny7Y37tKqFWg';
    private readonly integritySecret =
        'stagtest_integrity_nAIBuqayW70XpUqJS4qf4STYiISd89Fp';

    constructor(private readonly httpService: HttpService) { }

    // Tokenizar tarjeta
    async tokenizeCard(cardDetails: any) {
        const url = `${this.apiBaseUrl}/tokens/cards`;
        const headers = {
            Authorization: `Bearer ${this.publicKey}`,
            'Content-Type': 'application/json',
        };

        const response = await lastValueFrom(
            this.httpService.post(url, cardDetails, { headers }),
        );

        return response.data;
    }

    // Obtener token de aceptación
    async getAcceptanceToken() {
        const url = `${this.apiBaseUrl}/merchants/${this.publicKey}`;
        const response = await lastValueFrom(this.httpService.get(url));
        // return response.data.data.presigned_acceptance.acceptance_token;
        return { "acceptance_token": response.data.data.presigned_acceptance.acceptance_token }

    }

    // Crear transacción
    async createTransaction(transactionPayload: any, appTransactionPayload: any) {
        // Wompi Transaction
        const wompiUrl = `${this.apiBaseUrl}/transactions`;
        const headers = {
            Authorization: `Bearer ${this.privateKey}`,
            'Content-Type': 'application/json',
        };

        const signature = {
            signature: this.generateSignature(
                transactionPayload.reference,
                transactionPayload.amount_in_cents,
                transactionPayload.currency,
            ),
        };

        // Crea la firma y combina los datos
        const wompiTransactionData = { ...signature, ...transactionPayload };

        // Llama a Wompi y guarda el resultado
        const wompiResponse = await lastValueFrom(
            this.httpService.post(wompiUrl, wompiTransactionData, { headers }),
        );

        // Obtener el ID de la transacción creada en Wompi
        const wompiTransactionId = wompiResponse.data?.data?.id;

        // App Transaction
        const appTransactionData = {
            productId: appTransactionPayload.productId,
            customerId: appTransactionPayload.customerId,
            amount: transactionPayload.amount_in_cents, // Convertir a la escala original si es necesario
            wompiTransactionId, // Asocia el ID de Wompi con tu transacción local
        };

        // Llama al endpoint interno para registrar los datos
        // TODO: modificar el localhost y que tome la url base.
        const appResponse = await lastValueFrom(
            this.httpService.post('http://localhost:3000/transactions', appTransactionData),
        );

        return {
            wompiTransaction: wompiResponse.data,
            appTransaction: appResponse.data,
        };
    }

    // Obtener detalle de transacción
    async getTransactionDetails(transactionId: string) {
        const url = `${this.apiBaseUrl}/transactions/${transactionId}`;
        const headers = {
            Authorization: `Bearer ${this.publicKey}`,
        };

        const response = await lastValueFrom(this.httpService.get(url, { headers }));

        return response.data;
    }

    // Generar firma
    generateSignature(reference: string, amountInCents: number, currency: string) {
        const stringToSign = `${reference}${amountInCents}${currency}${this.integritySecret}`;
        return require('crypto')
            .createHash('sha256')
            .update(stringToSign)
            .digest('hex');
    }
}
