using backend.Dto.Style;
using backend.Models;

namespace backend.Interfaces
{
    public interface IStyleRepository
    {
        Task<List<Style>> GetAllAsync();
        Task<Style?> GetByIdAsync(int id);
        Task<Style> CreateAsync(Style styleModel);
        Task<Style?> UpdateAsync(int id, UpdateStyleRequestDto styleDto);
        Task<Style?> DeleteAsync(int id);
    }
}
