using backend.Dto.Style;
using backend.Models;

namespace backend.Mappers
{
    public static class StyleMappers
    {
        public static StyleDto ToStyleDto(this Style styleModel)
        {
            return new StyleDto
            {
                Id = styleModel.Id,
                StyleType = styleModel.StyleType,
            };
        }

        public static Style ToStyleFromCreateDto(this CreateStyleRequestDto styleModel) 
        {
            return new Style
            {
                StyleType = styleModel.StyleType,
            };
        }
    }
}
