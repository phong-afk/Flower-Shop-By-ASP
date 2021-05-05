using System.ComponentModel.DataAnnotations;

namespace FlowersShop.Data.Models
{
    public class Flower {
        [Key]
        public int Id { get; set; }
        [Required]
        [MaxLength(100)]
        public string Name { get; set; }
        public float UnitPrice { get; set; }
        public int Qty { get; set; }
        [MaxLength(200)]
        public string ImageName { get; set; }
    }
}