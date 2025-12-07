use anchor_lang::prelude::*;
use crate::state::*;
use crate::errors::ErrorCode;

#[derive(Accounts)]
pub struct ResolveMarket<'info> {
    #[account(mut)]
    pub market: Account<'info, Market>,
    
    #[account(address = market.authority)] // Only authority for now
    pub authority: Signer<'info>,
}

pub fn handler(ctx: Context<ResolveMarket>, winning_outcome: u8) -> Result<()> {
    let market = &mut ctx.accounts.market;
    
    require!(!market.resolved, ErrorCode::MarketResolved);
    require!((winning_outcome as usize) < market.outcomes.len(), ErrorCode::InvalidOutcome);
    
    market.resolved = true;
    market.winning_outcome = Some(winning_outcome);
    
    Ok(())
}
