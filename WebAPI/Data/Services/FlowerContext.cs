using Microsoft.EntityFrameworkCore;
using FlowersShop.Data.Models;

namespace FlowersShop.Data.Services
{
    public class FlowerContext : DbContext
    {
        public FlowerContext (DbContextOptions<FlowerContext> options)
        :base (options)
        {

        }

        public DbSet<Flower> Flowers { get; set; }
    }
}