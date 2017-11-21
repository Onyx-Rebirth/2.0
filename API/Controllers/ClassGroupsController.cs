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
    public class ClassGroupsController : ApiController
    {
        private onyx2Entities1 db = new onyx2Entities1();

        // GET: api/ClassGroups
        public IQueryable<classgroup> Getclassgroups()
        {
            return db.classgroups;
        }

        // GET: api/ClassGroups/5
        [ResponseType(typeof(classgroup))]
        public async Task<IHttpActionResult> Getclassgroup(int id)
        {
            classgroup classgroup = await db.classgroups.FindAsync(id);
            if (classgroup == null)
            {
                return NotFound();
            }

            return Ok(classgroup);
        }

        // PUT: api/ClassGroups/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> Putclassgroup(int id, classgroup classgroup)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != classgroup.CID)
            {
                return BadRequest();
            }

            db.Entry(classgroup).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!classgroupExists(id))
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

        // POST: api/ClassGroups
        [ResponseType(typeof(classgroup))]
        public async Task<IHttpActionResult> Postclassgroup(classgroup classgroup)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.classgroups.Add(classgroup);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (classgroupExists(classgroup.CID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = classgroup.CID }, classgroup);
        }

        // DELETE: api/ClassGroups/5
        [ResponseType(typeof(classgroup))]
        public async Task<IHttpActionResult> Deleteclassgroup(int id)
        {
            classgroup classgroup = await db.classgroups.FindAsync(id);
            if (classgroup == null)
            {
                return NotFound();
            }

            db.classgroups.Remove(classgroup);
            await db.SaveChangesAsync();

            return Ok(classgroup);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool classgroupExists(int id)
        {
            return db.classgroups.Count(e => e.CID == id) > 0;
        }
    }
}