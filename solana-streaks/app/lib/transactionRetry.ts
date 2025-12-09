// Transaction retry utility with exponential backoff
// Handles network errors, congestion, and transient failures

import { Connection, Transaction, SendOptions, TransactionSignature } from '@solana/web3.js';
import { toast } from 'sonner';

interface RetryOptions {
    maxRetries?: number;
    initialDelay?: number;
    maxDelay?: number;
    backoffMultiplier?: number;
}

const DEFAULT_RETRY_OPTIONS: Required<RetryOptions> = {
    maxRetries: 3,
    initialDelay: 1000, // 1 second
    maxDelay: 10000, // 10 seconds
    backoffMultiplier: 2,
};

/**
 * Sends a transaction with automatic retry logic
 * @param connection Solana connection
 * @param transaction Transaction to send
 * @param sendOptions Send options
 * @param retryOptions Retry configuration
 * @returns Transaction signature
 */
export async function sendTransactionWithRetry(
    connection: Connection,
    transaction: Transaction,
    sendOptions?: SendOptions,
    retryOptions?: RetryOptions
): Promise<TransactionSignature> {
    const options = { ...DEFAULT_RETRY_OPTIONS, ...retryOptions };
    let lastError: Error | null = null;
    let delay = options.initialDelay;

    for (let attempt = 0; attempt <= options.maxRetries; attempt++) {
        try {
            // Show retry attempt if not first try
            if (attempt > 0) {
                toast.loading(`Retrying transaction (attempt ${attempt + 1}/${options.maxRetries + 1})...`, {
                    id: 'retry-toast',
                });
            }

            // Send transaction
            const signature = await connection.sendRawTransaction(
                transaction.serialize(),
                sendOptions
            );

            // Confirm transaction
            const confirmation = await connection.confirmTransaction(signature, 'confirmed');

            if (confirmation.value.err) {
                throw new Error(`Transaction failed: ${JSON.stringify(confirmation.value.err)}`);
            }

            // Success - dismiss retry toast
            if (attempt > 0) {
                toast.dismiss('retry-toast');
            }

            return signature;

        } catch (error: any) {
            lastError = error;

            // Don't retry on certain errors
            if (isNonRetryableError(error)) {
                throw error;
            }

            // If this was the last attempt, throw
            if (attempt === options.maxRetries) {
                toast.dismiss('retry-toast');
                throw new Error(`Transaction failed after ${options.maxRetries + 1} attempts: ${error.message}`);
            }

            // Wait before retrying (exponential backoff)
            await sleep(Math.min(delay, options.maxDelay));
            delay *= options.backoffMultiplier;
        }
    }

    // Should never reach here, but TypeScript needs it
    throw lastError || new Error('Transaction failed');
}

/**
 * Determines if an error should not be retried
 */
function isNonRetryableError(error: any): boolean {
    const message = error.message?.toLowerCase() || '';

    // Don't retry these errors
    const nonRetryablePatterns = [
        'insufficient funds',
        'insufficient balance',
        'account not found',
        'invalid signature',
        'already processed',
        'already claimed',
        'unauthorized',
        'access denied',
        'invalid instruction',
    ];

    return nonRetryablePatterns.some(pattern => message.includes(pattern));
}

/**
 * Sleep utility
 */
function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Retry a generic async operation
 */
export async function retryOperation<T>(
    operation: () => Promise<T>,
    options?: RetryOptions
): Promise<T> {
    const opts = { ...DEFAULT_RETRY_OPTIONS, ...options };
    let lastError: Error | null = null;
    let delay = opts.initialDelay;

    for (let attempt = 0; attempt <= opts.maxRetries; attempt++) {
        try {
            return await operation();
        } catch (error: any) {
            lastError = error;

            if (attempt === opts.maxRetries) {
                throw error;
            }

            await sleep(Math.min(delay, opts.maxDelay));
            delay *= opts.backoffMultiplier;
        }
    }

    throw lastError || new Error('Operation failed');
}

/**
 * Fetch with retry logic
 */
export async function fetchWithRetry(
    url: string,
    options?: RequestInit,
    retryOptions?: RetryOptions
): Promise<Response> {
    return retryOperation(
        async () => {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            return response;
        },
        retryOptions
    );
}
