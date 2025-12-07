use anchor_lang::prelude::*;

#[account]
pub struct Market {
    pub authority: Pubkey,
    pub question: String,      // 4 + len
    pub outcomes: Vec<String>, // 4 + (4 + len) * count
    pub resolution_time: i64,
    pub total_pool: u64,
    pub resolved: bool,
    pub winning_outcome: Option<u8>,
    pub oracle_source: Option<Pubkey>,
    pub bump: u8,
}

impl Market {
    // Estimating space: 
    // Discriminator (8) + Pubkey (32) + String Prefix (4) + 100 chars + Vec Prefix (4) + 4 * (4+20) + i64 (8) + u64 (8) + bool (1) + Option<u8> (2) + Option<Pubkey> (33) + bump (1)
    // ~ 500 bytes largely sufficient for demo
    pub const MAXIMUM_SIZE: usize = 8 + 32 + (4 + 100) + (4 + 4 * 24) + 8 + 8 + 1 + 2 + 33 + 1;
}

#[account]
pub struct UserProfile {
    pub authority: Pubkey,
    pub total_bets: u64,
    pub total_wins: u64,
    pub current_streak: u32,
    pub longest_streak: u32,
    pub last_bet_timestamp: i64,
    pub bump: u8,
}

impl UserProfile {
    pub const SIZE: usize = 8 + 32 + 8 + 8 + 4 + 4 + 8 + 1;
}

#[account]
pub struct Bet {
    pub market: Pubkey,
    pub user: Pubkey,
    pub amount: u64,
    pub prediction: u8,
    pub claimed: bool,
    pub timestamp: i64,
    pub bump: u8,
}

impl Bet {
    pub const SIZE: usize = 8 + 32 + 32 + 8 + 1 + 1 + 8 + 1;
}
