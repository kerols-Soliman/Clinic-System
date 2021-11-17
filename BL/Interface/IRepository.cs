using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace BL.Interface
{
    public interface IRepository<T> where T:class
    {
        ICollection<T> GetAll();
        ICollection<T> GetWhere(Expression<Func<T, bool>> filter = null, string includeProperties = "");

        T GetById(int id);
        T Insert(T entity);
        void Update(T entity);
        void Delete(int Id);

    }
}
