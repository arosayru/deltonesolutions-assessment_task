using TaskManager.API.Models;

namespace TaskManager.API.Repositories.Interfaces
{
    public interface IUserRepository
    {
        Task<User?> GetByEmail(string email);
        Task<User?> GetByResetToken(string token);
        Task CreateUser(User user);
        Task SaveChanges();
    }
}