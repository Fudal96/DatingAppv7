using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    // DbContext wors as a service
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

    // Users is the name for the Database Table
        public DbSet<AppUser> Users { get; set; }
    }
}