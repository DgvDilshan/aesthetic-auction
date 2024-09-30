using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Category
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string CategoryName {  get; set; } = string.Empty;
        [Required]
        public string Image {  get; set; } = string.Empty;
        public List<Art> Arts { get; set; } = new List<Art>();
    }
}
