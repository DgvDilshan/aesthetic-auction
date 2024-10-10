using backend.Data;
using backend.Interfaces;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository
{
    public class AuctionRepository: IAuctionRepository
    {
       private readonly ApplicationDBContext _context;
        public AuctionRepository(ApplicationDBContext context)
        {
            _context = context;
        }
        public async Task CheckAndUpdateStatus(Auction auction)
        {
            if (auction.EndDate < DateTime.Now && auction.Status != "Complete")
            {
                auction.Status = "Complete";
                _context.Auction.Update(auction);
                await _context.SaveChangesAsync();
            }
            if (auction.StartDate <= DateTime.Now && auction.Status != "Active")
            {
                auction.Status = "Active";
                _context.Auction.Update(auction);
                await _context.SaveChangesAsync();
            }
        }
        public async Task<List<Auction>> GetAllAsync()
        {
            var auctions = await _context.Auction.ToListAsync();

            foreach (var auction in auctions)
            {
                await CheckAndUpdateStatus(auction);
            }

            return auctions;
        }
        public async Task<Auction> CreateAsync(Auction auctionModel)
        {
            await _context.Auction.AddAsync(auctionModel);
            await _context.SaveChangesAsync();
            return auctionModel;
        }
        public async Task<Auction?> GetByIdAsync(int id)
        {
            return await _context.Auction.FirstOrDefaultAsync(x => x.Id == id);
        }
        public async Task<List<Auction?>> GetByUserAsync(string userId)
        {
            var auctions = await _context.Auction
    .Where(x => x.UserId == userId)
    .ToListAsync();

            foreach (var auction in auctions)
            {
                await CheckAndUpdateStatus(auction);
            }

            return auctions;

        }
        public async Task<Auction?> UpdateAsync(int id, Auction auctionModel)
        {
            var existingAuction = await _context.Auction.FindAsync(id);

            if (existingAuction == null)
            {
               return null;
            }
            existingAuction.StartDate = auctionModel.StartDate;
            existingAuction.EndDate = auctionModel.EndDate;
            existingAuction.Status = auctionModel.Status;
            existingAuction.ArtId = auctionModel.ArtId;

            await _context.SaveChangesAsync();
            return existingAuction;
        }
        public async Task<Auction?> DeleteAsync(int id)
        {
            var aunctionModel = await _context.Auction.FirstOrDefaultAsync(x => x.Id == id);

            if(aunctionModel == null)
            {
                return null;
            }
            _context.Auction.Remove(aunctionModel);
            await _context.SaveChangesAsync();
            return aunctionModel;

        }
        public async Task<Auction?> GetByArtId(int id)
        {
            return await _context.Auction.FirstOrDefaultAsync(x => x.ArtId == id);
        }
    }
}
