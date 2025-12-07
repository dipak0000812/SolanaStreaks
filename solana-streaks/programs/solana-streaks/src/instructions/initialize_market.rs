use anchor_lang::prelude::*;
use crate::state::*;
// use crate::errors::ErrorCode;

#[derive(Accounts)]
#[instruction(question: String, outcomes: Vec<String>, resolution_time: i64)]
pub struct InitializeMarket<'info> {
    #[account(
        init,
        payer = authority,
        space = Market::MAXIMUM_SIZE,
        seeds = [b"market", question.as_bytes()[..10].as_ref()], // naive seed for demo
        bump
    )]
    pub market: Account<'info, Market>,
    
    #[account(mut)]
    pub authority: Signer<'info>,
    
    pub system_program: Program<'info, System>,
}

pub fn handler(
    ctx: Context<InitializeMarket>, 
    question: String, 
    outcomes: Vec<String>, 
    resolution_time: i64,
    oracle_source: Option<Pubkey>
) -> Result<()> {
    let market = &mut ctx.accounts.market;
    market.authority = ctx.accounts.authority.key();
    market.question = question;
    market.outcomes = outcomes;
    market.resolution_time = resolution_time;
    market.total_pool = 0;
    market.resolved = false;
    market.winning_outcome = None;
    market.oracle_source = oracle_source;
    market.bump = ctx.bumps.market;
    
    Ok(())
}
