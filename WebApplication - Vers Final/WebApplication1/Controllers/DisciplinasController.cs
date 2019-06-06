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
    [Route("api/Disciplinas")]
    public class DisciplinasController : Controller
    {
        private readonly AppDbContext _context;

        public DisciplinasController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Disciplinas
        [HttpGet]
        public IEnumerable<Disciplina> GetDisciplinas()
        {
            return _context.Disciplinas.Include(p => p.Responsavel);
        }

        // GET: api/Disciplinas/Professores
        [HttpGet]
        [Route("Professores")]
        public IEnumerable<Usuario> GetResponsaveis()
        {
            return _context.Usuarios.Where(m => m.Admin == false);
        }

        // GET: api/Disciplinas/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetDisciplina([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var disciplina = await _context.Disciplinas.Include(p => p.Responsavel).SingleOrDefaultAsync(m => m.Id == id);

            if (disciplina == null)
            {
                return NotFound();
            }

            return Ok(disciplina);
        }

        // PUT: api/Disciplinas/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDisciplina([FromRoute] int id, [FromForm] Disciplina disciplina)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != disciplina.Id)
            {
                return BadRequest();
            }

            _context.Entry(disciplina).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DisciplinaExists(id))
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

        // POST: api/Disciplinas
        [HttpPost]
        public async Task<IActionResult> PostDisciplina([FromForm] Disciplina disciplina)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Disciplinas.Add(disciplina);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDisciplina", new { id = disciplina.Id }, disciplina);
        }

        // DELETE: api/Disciplinas/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDisciplina([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var disciplina = await _context.Disciplinas.SingleOrDefaultAsync(m => m.Id == id);
            if (disciplina == null)
            {
                return NotFound();
            }

            _context.Disciplinas.Remove(disciplina);
            await _context.SaveChangesAsync();

            return Ok(disciplina);
        }

        private bool DisciplinaExists(int id)
        {
            return _context.Disciplinas.Any(e => e.Id == id);
        }
    }
}