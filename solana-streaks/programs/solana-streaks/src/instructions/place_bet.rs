use anchor_lang::prelude::*;
use anchor_lang::system_program;
use crate::state::*;
use crate::errors::ErrorCode;

#[derive(Accounts)]
#[instruction(prediction: u8, amount: u64)]
pub struct PlaceBet<'info> {
    #[account(mut)]
    pub market: Account<'info, Market>,
    
    #[account(
        init_if_needed,
        payer = user,
        space = UserProfile::SIZE,
        seeds = [b"user", user.key().as_ref()],
        bump
    )]
    pub user_profile: Account<'info, UserProfile>,
    
    #[account(
        init,
        payer = user,
        space = Bet::SIZE,
        seeds = [b"bet", market.key().as_ref(), user.key().as_ref()],
        bump
    )]
    pub bet: Account<'info, Bet>,
    
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

pub fn handler(ctx: Context<PlaceBet>, prediction: u8, amount: u64) -> Result<()> {
    let market = &mut ctx.accounts.market;
    let user_profile = &mut ctx.accounts.user_profile;
    let bet = &mut ctx.accounts.bet;
    
    require!(market.resolution_time > Clock::get()?.unix_timestamp, ErrorCode::MarketExpired);
    require!((prediction as usize) < market.outcomes.len(), ErrorCode::InvalidOutcome);
    require!(amount > 0, ErrorCode::InsufficientFunds);
    
    // Transfer SOL to Market PDA (or we could use a vault)
    // For simplicity, we send to the Market account itself, but typically we'd use a vault.
    // The market account is data account, so we should separate the vault.
    // To keep it simple for Hackathon: Move to market account (it is owned by program).
    system_program::transfer(
        CpiContext::new(
            ctx.accounts.system_program.to_account_info(),
            system_program::Transfer {
                from: ctx.accounts.user.to_account_info(),
                to: market.to_account_info(),
            },
        ),
        amount,
    )?;

    market.total_pool += amount;
    
    // Update User Profile
    if user_profile.total_bets == 0 {
        user_profile.authority = ctx.accounts.user.key();
        user_profile.bump = ctx.bumps.user_profile;
    }
    user_profile.total_bets += 1;
    user_profile.last_bet_timestamp = Clock::get()?.unix_timestamp;

    // Record Bet
    bet.market = market.key();
    bet.user = ctx.accounts.user.key();
    bet.amount = amount;
    bet.prediction = prediction;
    bet.claimed = false;
    bet.timestamp = Clock::get()?.unix_timestamp;
    bet.bump = ctx.bumps.bet;

    Ok(())
}
