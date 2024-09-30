using backend.Dto.Category;
using backend.Models;

namespace backend.Mappers
{
    public static class CategoryMappers
    {
        public static CategoryDto ToCategoryDto(this Category categoryModel)
        {
            return new CategoryDto
            {
                Id = categoryModel.Id,
                CategoryName = categoryModel.CategoryName,
                Image = categoryModel.Image
            };
        }

        public static Category ToCategoryFromCreate(this CreateCategoryDto createCategoryDto) {
            return new Category
            {
                CategoryName = createCategoryDto.CategoryName,
                Image = createCategoryDto.Image
            };
        }

        public static Category ToCategoryFromUpdate(this UpdateCategoryDto categoryDto, int id)
        {
            return new Category
            {
                CategoryName = categoryDto.CategoryName,
                Image = categoryDto.Image,
            };
        }
    }
}
