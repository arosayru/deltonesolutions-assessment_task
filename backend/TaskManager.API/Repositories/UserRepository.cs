using Microsoft.EntityFrameworkCore;
using TaskManager.API.Data;
using TaskManager.API.Models;
using TaskManager.API.Repositories.Interfaces;

namespace TaskManager.API.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext _context;
        public UserRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<User?> GetByEmail(string email)
        {
            return await _context.Users.FirstOrDefaultAsync(x => x.Email == email);
        }

        public async Task<User?> GetByResetToken(string token)
        {
            return await _context.Users.FirstOrDefaultAsync(x => x.ResetToken == token);
        }

        public async Task CreateUser(User user)
        {
            await _context.Users.AddAsync(user);
        }

        public async Task SaveChanges()
        {
            await _context.SaveChangesAsync();
        }
    }
}