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
    [Route("api/Plano")]
    public class PlanosController : Controller
    {
        private readonly AppDbContext _context;

        public PlanosController(AppDbContext context)
        {
            _context = context;
        }


        [HttpGet]
        [Route("Competencias/{id}")]
        public IEnumerable<CompetenciaPlano> GetCompetencias([FromRoute] int id)
        {
            return _context.CompetenciasPlano
           .Include(ci => ci.Competencia)
           .Where(ci => ci.Turma.Id == id);
           //.Select(ci => ci.Competencia);
        }

        // POST: api/Competencias/{id}
        [HttpPost]
        [Route("Competencias")]
        public async Task<IActionResult> PostCompetencia([FromForm] CompetenciaPlano competencia)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.CompetenciasPlano.Add(competencia);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTurma", new { id = competencia.Id }, competencia);
        }

        // DELETE: api/Competencias/{id}
        [HttpDelete]
        [Route("Competencias/{id}")]
        public async Task<IActionResult> DeleteCompetencia([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var plano = await _context.CompetenciasPlano.SingleOrDefaultAsync(m => m.Id == id);
            if (plano == null)
            {
                return NotFound();
            }

            _context.CompetenciasPlano.Remove(plano);
            await _context.SaveChangesAsync();

            return Ok(plano);
        }

        [HttpGet]
        [Route("Habilidades/{id}")]
        public IEnumerable<HabilidadePlano> GetHabilidades([FromRoute] int id)
        {
            return _context.HabilidadesPlano
           .Include(ci => ci.Habilidade)
           .Where(ci => ci.Turma.Id == id);
            //.Select(ci => ci.Habilidade);
        }

        // POST: api/Habilidades/{id}
        [HttpPost]
        [Route("Habilidades")]
        public async Task<IActionResult> PostHabilidade([FromForm] HabilidadePlano habilidade)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.HabilidadesPlano.Add(habilidade);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTurma", new { id = habilidade.Id }, habilidade);
        }

        // DELETE: api/Habilidades/{id}
        [HttpDelete]
        [Route("Habilidades/{id}")]
        public async Task<IActionResult> DeleteHabilidade([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var plano = await _context.HabilidadesPlano.SingleOrDefaultAsync(m => m.Id == id);
            if (plano == null)
            {
                return NotFound();
            }

            _context.HabilidadesPlano.Remove(plano);
            await _context.SaveChangesAsync();

            return Ok(plano);
        }

        [HttpGet]
        [Route("Objetivos/{id}")]
        public IEnumerable<ObjetivoPlano> GetObjetivos([FromRoute] int id)
        {
            return _context.ObjetivosPlano
           .Include(ci => ci.Objetivo)
           .Where(ci => ci.Turma.Id == id);
            //.Select(ci => ci.Objetivo);
        }

        // POST: api/Objetivos/{id}
        [HttpPost]
        [Route("Objetivos")]
        public async Task<IActionResult> PostObjetivo([FromForm] ObjetivoPlano objetivo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.ObjetivosPlano.Add(objetivo);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTurma", new { id = objetivo.Id }, objetivo);
        }

        // DELETE: api/Objetivos/{id}
        [HttpDelete]
        [Route("Objetivos/{id}")]
        public async Task<IActionResult> DeleteObjetivo([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var plano = await _context.ObjetivosPlano.SingleOrDefaultAsync(m => m.Id == id);
            if (plano == null)
            {
                return NotFound();
            }

            _context.ObjetivosPlano.Remove(plano);
            await _context.SaveChangesAsync();

            return Ok(plano);
        }

        [HttpGet]
        [Route("Topicos/{id}")]
        public IEnumerable<TopicoPlano> GetTopicos([FromRoute] int id)
        {
            return _context.TopicosPlano
           .Include(ci => ci.Topico)
           .Where(ci => ci.Turma.Id == id);
            //.Select(ci => ci.Topico);
        }

        // POST: api/Topicos/{id}
        [HttpPost]
        [Route("Topicos")]
        public async Task<IActionResult> PostTopico([FromForm] TopicoPlano topico)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.TopicosPlano.Add(topico);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTurma", new { id = topico.Id }, topico);
        }

        // DELETE: api/Topicos/{id}
        [HttpDelete]
        [Route("Topicos/{id}")]
        public async Task<IActionResult> DeleteTopico([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var plano = await _context.TopicosPlano.SingleOrDefaultAsync(m => m.Id == id);
            if (plano == null)
            {
                return NotFound();
            }

            _context.TopicosPlano.Remove(plano);
            await _context.SaveChangesAsync();

            return Ok(plano);
        }

        [HttpGet]
        [Route("Livros/{id}")]
        public IEnumerable<LivroPlano> GetLivros([FromRoute] int id)
        {
            return _context.LivrosPlano
           .Include(ci => ci.Livro)
           .Where(ci => ci.Turma.Id == id);
            //.Select(ci => ci.Livro);
        }

        // POST: api/Livros/{id}
        [HttpPost]
        [Route("Livros")]
        public async Task<IActionResult> PostLivro([FromForm] LivroPlano livro)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.LivrosPlano.Add(livro);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTurma", new { id = livro.Id }, livro);
        }

        // DELETE: api/Livros/{id}
        [HttpDelete]
        [Route("Livros/{id}")]
        public async Task<IActionResult> DeleteLivro([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var plano = await _context.LivrosPlano.SingleOrDefaultAsync(m => m.Id == id);
            if (plano == null)
            {
                return NotFound();
            }

            _context.LivrosPlano.Remove(plano);
            await _context.SaveChangesAsync();

            return Ok(plano);
        }

    }
}