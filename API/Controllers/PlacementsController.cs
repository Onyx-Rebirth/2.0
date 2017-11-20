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
    public class PlacementsController : ApiController
    {
        private onyx2Entities1 db = new onyx2Entities1();

        // GET: api/Placements
        public IQueryable<Placement> GetPlacements()
        {
            return db.Placements;
        }

        // GET: api/Placements/5
        [ResponseType(typeof(Placement))]
        public async Task<IHttpActionResult> GetPlacement(string id)
        {
            Placement placement = await db.Placements.FindAsync(id);
            if (placement == null)
            {
                return NotFound();
            }

            return Ok(placement);
        }

        // PUT: api/Placements/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutPlacement(string id, Placement placement)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != placement.RoomNo)
            {
                return BadRequest();
            }

            db.Entry(placement).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PlacementExists(id))
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

        // POST: api/Placements
        [ResponseType(typeof(Placement))]
        public async Task<IHttpActionResult> PostPlacement(Placement placement)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Placements.Add(placement);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (PlacementExists(placement.RoomNo))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = placement.RoomNo }, placement);
        }

        // DELETE: api/Placements/5
        [ResponseType(typeof(Placement))]
        public async Task<IHttpActionResult> DeletePlacement(string id)
        {
            Placement placement = await db.Placements.FindAsync(id);
            if (placement == null)
            {
                return NotFound();
            }

            db.Placements.Remove(placement);
            await db.SaveChangesAsync();

            return Ok(placement);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PlacementExists(string id)
        {
            return db.Placements.Count(e => e.RoomNo == id) > 0;
        }
    }
}