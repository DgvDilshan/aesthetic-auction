using backend.Dto.Medium;
using backend.Models;

namespace backend.Interfaces
{
    public interface IMediumRepository
    {
        Task<List<Medium>> GetAllAsync();
        Task<Medium?> GetByIdAsync(int id);
        Task<Medium> CreateAsync(Medium mediumModel);
        Task<Medium?> UpdateAsync(int id, UpdateMediumRequestDto mediumDto);
        Task<Medium?> DeleteAsync(int id);
    }
}
