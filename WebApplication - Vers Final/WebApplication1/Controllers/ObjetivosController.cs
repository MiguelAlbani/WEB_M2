using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1;

namespace WebApplication1.Controllers
{
    [Produces("application/json")]
    [Route("api/Objetivos")]
    public class ObjetivosController : Controller
    {
        private readonly AppDbContext _context;

        public ObjetivosController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Objetivos
        [HttpGet]
        public IEnumerable<Objetivo> GetObjetivos()
        {
            return _context.Objetivos.Include(p => p.Curso);
        }

        // GET: api/Objetivos/Cursos
        [HttpGet]
        [Route("Cursos")]
        public IEnumerable<Curso> GetCursos()
        {
            return _context.Cursos;
        }

        // GET: api/Objetivos/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetObjetivo([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var objetivo = await _context.Objetivos.Include(p => p.Curso).SingleOrDefaultAsync(m => m.Id == id);

            if (objetivo == null)
            {
                return NotFound();
            }

            return Ok(objetivo);
        }

        // PUT: api/Objetivos/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutObjetivo([FromRoute] int id, [FromForm] Objetivo objetivo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != objetivo.Id)
            {
                return BadRequest();
            }

            _context.Entry(objetivo).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ObjetivoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Objetivos
        [HttpPost]
        public async Task<IActionResult> PostObjetivo([FromForm] Objetivo objetivo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Objetivos.Add(objetivo);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetObjetivo", new { id = objetivo.Id }, objetivo);
        }

        // DELETE: api/Objetivos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteObjetivo([FromForm] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var objetivo = await _context.Objetivos.SingleOrDefaultAsync(m => m.Id == id);
            if (objetivo == null)
            {
                return NotFound();
            }

            _context.Objetivos.Remove(objetivo);
            await _context.SaveChangesAsync();

            return Ok(objetivo);
        }

        private bool ObjetivoExists(int id)
        {
            return _context.Objetivos.Any(e => e.Id == id);
        }
    }
}