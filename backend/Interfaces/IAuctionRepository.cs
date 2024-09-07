using backend.Models;

namespace backend.Interfaces
{
    public interface IAuctionRepository
    {
        Task<List<Auction>> GetAllAsync();
        Task<Auction?> GetByIdAsync(int id);
        Task<Auction?> UpdateAsync(int id, Auction auctionModel);
        Task<Auction> CreateAsync(Auction auctionModel);
        Task <Auction?> DeleteAsync(int id);
        Task <Auction?> GetByArtId(int id);

    }
}
