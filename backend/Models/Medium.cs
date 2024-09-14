namespace backend.Models
{
    public class Medium
    {
        public int Id { get; set; }
        public string MediumType { get; set; } = string.Empty;
        public List<Art> Art { get; set; } = new List<Art>();
    }
}
