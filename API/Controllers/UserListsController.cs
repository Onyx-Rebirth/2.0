using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using API;

namespace API.Controllers
{
    public class UserListsController : ApiController
    {
        private onyx2Entities1 db = new onyx2Entities1();

        // GET: api/UserLists
        public IQueryable<UserList> GetUserLists()
        {
            return db.UserLists;
        }

        // GET: api/UserLists/5
        [ResponseType(typeof(UserList))]
        public async Task<IHttpActionResult> GetUserList(int id)
        {
            UserList userList = await db.UserLists.FindAsync(id);
            if (userList == null)
            {
                return NotFound();
            }

            return Ok(userList);
        }

        // PUT: api/UserLists/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutUserList(int id, UserList userList)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != userList.uid)
            {
                return BadRequest();
            }

            db.Entry(userList).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserListExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/UserLists
        [ResponseType(typeof(UserList))]
        public async Task<IHttpActionResult> PostUserList(UserList userList)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.UserLists.Add(userList);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (UserListExists(userList.uid))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = userList.uid }, userList);
        }

        // DELETE: api/UserLists/5
        [ResponseType(typeof(UserList))]
        public async Task<IHttpActionResult> DeleteUserList(int id)
        {
            UserList userList = await db.UserLists.FindAsync(id);
            if (userList == null)
            {
                return NotFound();
            }

            db.UserLists.Remove(userList);
            await db.SaveChangesAsync();

            return Ok(userList);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool UserListExists(int id)
        {
            return db.UserLists.Count(e => e.uid == id) > 0;
        }
    }
}