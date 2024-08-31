using backend.Dto.Medium;
using backend.Models;

namespace backend.Mappers
{
    public static class MediumMappers
    {
        public static MediumDto ToMediumDto(this Medium mediumModel)
        {
            return new MediumDto
            {
                Id = mediumModel.Id,
                MediumType = mediumModel.MediumType,
            };
        }

        public static Medium ToMediumFromCreateDto(this CreateMediumRequestDto mediumModel) {
            return new Medium
            {
                MediumType = mediumModel.MediumType,
            };
        }
    }
}
