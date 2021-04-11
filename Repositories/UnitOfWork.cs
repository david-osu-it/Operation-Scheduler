using System.Threading.Tasks;
using Operation_Scheduler.Models;

namespace Operation_Scheduler.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly OperationSchedulerContext context;
        public UnitOfWork(OperationSchedulerContext context)
        {
            this.context = context;

        }
        public async Task CompleteAsync()
        {
            await context.SaveChangesAsync();
        }
    }
}