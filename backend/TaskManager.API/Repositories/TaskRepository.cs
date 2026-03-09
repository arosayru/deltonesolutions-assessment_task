using Microsoft.EntityFrameworkCore;
using TaskManager.API.Data;
using TaskManager.API.Models;
using TaskManager.API.Repositories.Interfaces;

namespace TaskManager.API.Repositories
{
    public class TaskRepository : ITaskRepository
    {
        private readonly AppDbContext _context;
        public TaskRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<TaskItem>> GetAllTasks(int userId)
        {
            return await _context.Tasks.Where(t => t.UserId == userId).ToListAsync();
        }

        public async Task<TaskItem?> GetTaskById(int id)
        {
            return await _context.Tasks.FindAsync(id);
        }

        public async Task<TaskItem> CreateTask(TaskItem task)
        {
            await _context.Tasks.AddAsync(task);
            return task;
        }

        public async Task UpdateTask(TaskItem task)
        {
            _context.Tasks.Update(task);
        }

        public async Task DeleteTask(TaskItem task)
        {
            _context.Tasks.Remove(task);
        }

        public async Task SaveChanges()
        {
            await _context.SaveChangesAsync();
        }
    }
}