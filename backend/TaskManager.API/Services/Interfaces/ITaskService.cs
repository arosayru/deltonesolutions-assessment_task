using TaskManager.API.DTOs;
using TaskManager.API.Models;

namespace TaskManager.API.Services.Interfaces
{
    public interface ITaskService
    {
        Task<IEnumerable<TaskItem>> GetTasks();
        Task<TaskItem?> GetTask(int id);
        Task<TaskItem> CreateTask(TaskDto dto);
        Task<bool> UpdateTask(int id, TaskDto dto);
        Task<bool> DeleteTask(int id);
        Task<TaskItem?> ToggleTask(int id);
    }
}