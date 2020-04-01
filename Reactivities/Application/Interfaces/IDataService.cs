using Domain;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public  interface IDataService
    {
        Task<IEnumerable<Value>> GetValuesAsync();
        Task<Value> GetValueAsync(int id);
    }
}
