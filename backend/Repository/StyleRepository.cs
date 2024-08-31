using backend.Data;
using backend.Dto.Style;
using backend.Interfaces;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository
{
    public class StyleRepository: IStyleRepository
    {
        private readonly ApplicationDBContext _context;
        public StyleRepository(ApplicationDBContext context) { _context = context; }

        public async Task<List<Style>> GetAllAsync()
        {
            return await _context.Style.ToListAsync();
        }

        public async Task<Style> CreateAsync(Style styleModel)
        {
            await _context.Style.AddAsync(styleModel);
            await _context.SaveChangesAsync();
            return styleModel;
        }

        public async Task<Style?> DeleteAsync(int id)
        {
            var styleModel = await _context.Style.FirstOrDefaultAsync(x => x.Id == id);
            if (styleModel == null)
            {
                return null;
            }
            _context.Style.Remove(styleModel);
            _context.SaveChanges();
            return styleModel;
        }

        public async Task<Style?> GetByIdAsync(int id)
        {
            return await _context.Style.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Style?> UpdateAsync(int id, UpdateStyleRequestDto styleDto)
        {
            var existingStyle = await _context.Style.FirstOrDefaultAsync(x => x.Id == id);

            if (existingStyle == null)
            {
                return null;
            }

            existingStyle.StyleType = styleDto.StyleType;

            await _context.SaveChangesAsync();
            return existingStyle;
        }
    }

}
