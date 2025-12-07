use anchor_lang::prelude::*;

#[error_code]
pub enum ErrorCode {
    #[msg("Market is already resolved.")]
    MarketResolved,
    #[msg("Market is not resolved yet.")]
    MarketNotResolved,
    #[msg("Market resolution time has passed.")]
    MarketExpired,
    #[msg("Market resolution time has not passed.")]
    MarketNotExpired,
    #[msg("Invalid outcome index.")]
    InvalidOutcome,
    #[msg("User already initialized.")]
    UserAlreadyInitialized,
    #[msg("Bet already claimed.")]
    BetAlreadyClaimed,
    #[msg("Bet prediction was incorrect.")]
    BetLost,
    #[msg("Insufficient funds.")]
    InsufficientFunds,
    #[msg("Unauthorized access.")]
    Unauthorized,
}
