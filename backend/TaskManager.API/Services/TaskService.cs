using TaskManager.API.DTOs;
using TaskManager.API.Models;
using TaskManager.API.Repositories.Interfaces;
using TaskManager.API.Services.Interfaces;

namespace TaskManager.API.Services
{
    public class TaskService : ITaskService
    {
        private readonly ITaskRepository _repository;
        public TaskService(ITaskRepository repository)
        {
            _repository = repository;
        }
        public async Task<IEnumerable<TaskItem>> GetTasks()
        {
            return await _repository.GetAllTasks();
        }
        public async Task<TaskItem?> GetTask(int id)
        {
            return await _repository.GetTaskById(id);
        }
        public async Task<TaskItem> CreateTask(TaskDto dto)
        {
            var task = new TaskItem
            {
                Title = dto.Title,
                Description = dto.Description,
                IsCompleted = dto.IsCompleted
            };

            await _repository.CreateTask(task);
            await _repository.SaveChanges();

            return task;
        }

        public async Task<bool> UpdateTask(int id, TaskDto dto)
        {
            var task = await _repository.GetTaskById(id);

            if (task == null)
                return false;

            task.Title = dto.Title;
            task.Description = dto.Description;
            task.IsCompleted = dto.IsCompleted;

            await _repository.UpdateTask(task);
            await _repository.SaveChanges();

            return true;
        }

        public async Task<bool> DeleteTask(int id)
        {
            var task = await _repository.GetTaskById(id);

            if (task == null)
                return false;

            await _repository.DeleteTask(task);
            await _repository.SaveChanges();

            return true;
        }

        public async Task<TaskItem?> ToggleTask(int id)
        {
            var task = await _repository.GetTaskById(id);

            if (task == null)
                return null;

            task.IsCompleted = !task.IsCompleted;

            await _repository.UpdateTask(task);
            await _repository.SaveChanges();

            return task;
        }
    }
}