using System.Threading.Tasks;

namespace Operation_Scheduler.Repositories
{
    public interface IUnitOfWork
    {
        Task CompleteAsync();
    }
}