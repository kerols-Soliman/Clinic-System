using BL.Interface;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace BL.Bases
{
    public class BaseRepository<T> : IRepository<T> where T : class
    {
        protected DbContext context;
        protected DbSet<T> DbSet;
        public BaseRepository(DbContext db)
        {
            context = db;
            DbSet = context.Set<T>();
        }

        public ICollection<T> GetAll()
        {
            return DbSet.ToList();
        }



        public T GetById(int id)
        {
            return DbSet.Find(id);
        }
        

        public virtual ICollection<T> GetWhere(Expression<Func<T, bool>> filter = null, string includeProperties = "")
        {
            IQueryable<T> query = DbSet;

            if (filter != null)
            {
                query = query.Where(filter);
            }
            query = includeProperties.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries)
                .Aggregate(query, (current, includeProperty) => current.Include(includeProperty));

            return query.ToList();
        }

        public virtual void Delete(int Id)
        {
            var entiry = DbSet.Find(Id);
            if (entiry == null)
                return;
            DbSet.Remove(entiry);
        }

        public T Insert(T entity)
        {
            EntityEntry<T> dbEntityEntry = context.Entry(entity);
            if (dbEntityEntry.State != EntityState.Detached)
            {
                dbEntityEntry.State = EntityState.Added;
            }
            else
            {
                DbSet.Add(entity);
            }
            return entity;
        }

        public void Update(T entity)
        {
            EntityEntry<T> dbEntityEntry = context.Entry(entity);

            if (dbEntityEntry.State == EntityState.Detached)
            {
                DbSet.Attach(entity);
            }
            dbEntityEntry.State = EntityState.Modified;
        }
    }
}
