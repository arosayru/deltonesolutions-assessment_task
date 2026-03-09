using TaskManager.API.Models;

namespace TaskManager.API.Repositories.Interfaces
{
    public interface ITaskRepository
    {
        Task<IEnumerable<TaskItem>> GetAllTasks();
        Task<TaskItem?> GetTaskById(int id);
        Task<TaskItem> CreateTask(TaskItem task);
        Task UpdateTask(TaskItem task);
        Task DeleteTask(TaskItem task);
        Task SaveChanges();
    }
}