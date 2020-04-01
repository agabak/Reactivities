using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interaces
{
    public interface IDataRepository
    {
        Task<IEnumerable<Value>> GetValuesAsync();

       Task<Value> GetValueAsync(int id);
    }
}
