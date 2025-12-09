use anchor_lang::prelude::*;

pub mod errors;
pub mod instructions;
pub mod state;

use instructions::*;

declare_id!("B5Rz9UoWgLrfzYppYpZpBpLzNCTuYV5Fjh3uGJd2UsbQ");

#[program]
pub mod solana_streaks {
    use super::*;

    pub fn initialize_market(
        ctx: Context<InitializeMarket>,
        question: String,
        outcomes: Vec<String>,
        resolution_time: i64,
        oracle_source: Option<Pubkey>,
    ) -> Result<()> {
        instructions::initialize_market::handler(ctx, question, outcomes, resolution_time, oracle_source)
    }

    pub fn place_bet(
        ctx: Context<PlaceBet>,
        prediction: u8,
        amount: u64,
    ) -> Result<()> {
        instructions::place_bet::handler(ctx, prediction, amount)
    }

    pub fn resolve_market(
        ctx: Context<ResolveMarket>,
        winning_outcome: u8,
    ) -> Result<()> {
        instructions::resolve_market::handler(ctx, winning_outcome)
    }

    pub fn claim_winnings(ctx: Context<ClaimWinnings>) -> Result<()> {
        instructions::claim_winnings::handler(ctx)
    }
}
