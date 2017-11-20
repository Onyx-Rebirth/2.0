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
    public class ScannersController : ApiController
    {
        private onyx2Entities1 db = new onyx2Entities1();

        // GET: api/Scanners
        public IQueryable<Scanner> GetScanners()
        {
            return db.Scanners;
        }

        // GET: api/Scanners/5
        [ResponseType(typeof(Scanner))]
        public async Task<IHttpActionResult> GetScanner(string id)
        {
            Scanner scanner = await db.Scanners.FindAsync(id);
            if (scanner == null)
            {
                return NotFound();
            }

            return Ok(scanner);
        }

        // PUT: api/Scanners/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutScanner(string id, Scanner scanner)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != scanner.ScannerId)
            {
                return BadRequest();
            }

            db.Entry(scanner).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ScannerExists(id))
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

        // POST: api/Scanners
        [ResponseType(typeof(Scanner))]
        public async Task<IHttpActionResult> PostScanner(Scanner scanner)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Scanners.Add(scanner);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ScannerExists(scanner.ScannerId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = scanner.ScannerId }, scanner);
        }

        // DELETE: api/Scanners/5
        [ResponseType(typeof(Scanner))]
        public async Task<IHttpActionResult> DeleteScanner(string id)
        {
            Scanner scanner = await db.Scanners.FindAsync(id);
            if (scanner == null)
            {
                return NotFound();
            }

            db.Scanners.Remove(scanner);
            await db.SaveChangesAsync();

            return Ok(scanner);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ScannerExists(string id)
        {
            return db.Scanners.Count(e => e.ScannerId == id) > 0;
        }
    }
}