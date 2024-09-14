namespace backend.Models
{
    public class Style
    {
        public int Id { get; set; }
        public string StyleType { get; set; } = string.Empty;
        public List<Art> Art { get; set; } = new List<Art>();
    }
}
