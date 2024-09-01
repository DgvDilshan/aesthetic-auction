using backend.Models;

namespace backend.Interfaces
{
    public interface IArtRepository
    {
        Task<List<Art>> GetAllAsync();
        Task<Art?> GetByIdAsync(int id);
        Task<Art?> UpdateAsync(int id, Art artModel);
        Task<Art> CreateAsync(Art artModel);
        Task<Art?> DeleteAsync(int id);
        Task<bool> StyleExists(int id);
        Task<bool> MediumExists(int id);
    }
}
