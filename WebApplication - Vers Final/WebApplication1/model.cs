using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1
{
    public class Usuario
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        [Required]
        [DisplayName("Id")]
        public int Id { get; set; }

        [MaxLength(50)]
        [DisplayName("Nome")]
        public string Nome { get; set; }

        [Required]
        [MaxLength(15)]
        [DisplayName("Login")]
        public string Login { get; set; }

        [Required]
        [MaxLength(15)]
        [DisplayName("Senha")]
        public string Senha { get; set; }

        [DisplayName("NDE")]
        public bool? NDE { get; set; }

        [DisplayName("Admin")]
        public bool? Admin { get; set; }

        //public virtual ICollection<Disciplina> Disciplinas { get; set; }
        //public ICollection<Curso> Cursos { get; set; }
    }

    public class Disciplina
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        [Required]
        [DisplayName("Id")]
        public int Id { get; set; }

        [MaxLength(50)]
        [DisplayName("Nome")]
        public string Nome { get; set; }

        [Required]
        [MaxLength(15)]
        [DisplayName("Codigo")]
        public string Codigo { get; set; }

        public int ResponsavelId { get; set; }

        [DisplayName("Responsavel")]
        [ForeignKey("ResponsavelId")]
        public Usuario Responsavel { get; set; }

    }

    public class Curso
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        [Required]
        [DisplayName("Id")]
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        [DisplayName("Nome")]
        public string Nome { get; set; }


        public int CoordenadorId { get; set; }

        [DisplayName("Coordenador")]
        [ForeignKey("CoordenadorId")]
        public Usuario Coordenador { get; set; }

    }

    public class Competencia
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        [Required]
        [DisplayName("Id")]
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        [DisplayName("Descrição")]
        public string Descricao { get; set; }

        [Required]
        public int CursoId { get; set; }

        [DisplayName("Curso")]
        [ForeignKey("CursoId")]
        public Curso Curso { get; set; }

    }

    public class Habilidade
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        [Required]
        [DisplayName("Id")]
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        [DisplayName("Descrição")]
        public string Descricao { get; set; }

        [Required]
        public int CursoId { get; set; }

        [DisplayName("Curso")]
        [ForeignKey("CursoId")]
        public Curso Curso { get; set; }

    }

    public class Objetivo
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        [Required]
        [DisplayName("Id")]
        public int Id { get; set; }

        [Required]
        [MaxLength(150)]
        [DisplayName("Descrição")]
        public string Descricao { get; set; }

        [Required]
        public int CursoId { get; set; }

        [DisplayName("Curso")]
        [ForeignKey("CursoId")]
        public Curso Curso { get; set; }

    }

    public class Livro
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        [Required]
        [DisplayName("Id")]
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        [DisplayName("Nome")]
        public string Nome { get; set; }

        [Required]
        public int CursoId { get; set; }

        [DisplayName("Curso")]
        [ForeignKey("CursoId")]
        public Curso Curso { get; set; }

    }

    public class Topico
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        [Required]
        [DisplayName("Id")]
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        [DisplayName("Nome")]
        public string Nome { get; set; }

        [Required]
        public int CursoId { get; set; }

        [DisplayName("Curso")]
        [ForeignKey("CursoId")]
        public Curso Curso { get; set; }

    }

    public class Semestre
    {
        [Key]
        [Required]
        [DisplayName("Id")]
        public int Id { get; set; }

        [Required]
        public int CursoId { get; set; }

        [DisplayName("Curso")]
        [ForeignKey("CursoId")]
        public Curso Curso { get; set; }

    }


    public class Turma
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        [Required]
        [DisplayName("Id")]
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        [DisplayName("Nome")]
        public string Nome { get; set; }

        [Required]
        [DisplayName("Horario")]
        public TimeSpan Horario { get; set; }

        [Required]
        public int SemestreId { get; set; }
        
        [DisplayName("Semestre")]
        [ForeignKey("SemestreId")]
        public Semestre Semestre { get; set; }

        [Required]
        public int ProfessorId { get; set; }
        
        [DisplayName("Professor")]
        [ForeignKey("ProfessorId")]
        public Usuario Professor { get; set; }

        [Required]
        public int DisciplinaId { get; set; }
        
        [DisplayName("Disciplina")]
        [ForeignKey("DisciplinaId")]
        public Disciplina Disciplina { get; set; }

        [Required]
        public int CursoId { get; set; }
        
        [DisplayName("Curso")]
        [ForeignKey("CursoId")]
        public Curso Curso { get; set; }

       // public virtual ICollection<CompetenciaPlano> Competencias { get; set; }

    }

    // Tabelas que serão usadas no plano de ensino

    public class CompetenciaPlano
    {
         [Key]
         [Required]
         [DisplayName("Id")]
         public int Id { get; set; }

         [Required]
         public int CompetenciaId { get; set; }

         [DisplayName("Competencia")]
         [ForeignKey("CompetenciaId")]
         public Competencia Competencia { get; set; }

         [Required]
         public int TurmaId { get; set; }

         [DisplayName("Turma")]
         [ForeignKey("TurmaId")]
         public Turma Turma { get; set; }

        //public virtual Competencia Competencia { get; set; }
        //public virtual Turma Turma { get; set; }

    }

    public class HabilidadePlano
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        [Required]
        [DisplayName("Id")]
        public int Id { get; set; }

        [Required]
        public int HabilidadeId { get; set; }

        [DisplayName("Habilidade")]
        [ForeignKey("HabilidadeId")]
        public Habilidade Habilidade { get; set; }

        [Required]
        public int TurmaId { get; set; }

        [DisplayName("Turma")]
        [ForeignKey("TurmaId")]
        public Turma Turma { get; set; }

    }

    public class LivroPlano
    {
        [Key]
        [Required]
        [DisplayName("Id")]
        public int Id { get; set; }

        [Required]
        public int LivroId { get; set; }

        [DisplayName("Livro")]
        [ForeignKey("LivroId")]
        public Livro Livro { get; set; }

        [Required]
        public int TurmaId { get; set; }

        [DisplayName("Turma")]
        [ForeignKey("TurmaId")]
        public Turma Turma { get; set; }

    }

    public class ObjetivoPlano
    {
        [Key]
        [Required]
        [DisplayName("Id")]
        public int Id { get; set; }

        [Required]
        public int ObjetivoId { get; set; }

        [DisplayName("Objetivo")]
        [ForeignKey("ObjetivoId")]
        public Objetivo Objetivo { get; set; }

        [Required]
        public int TurmaId { get; set; }

        [DisplayName("Turma")]
        [ForeignKey("TurmaId")]
        public Turma Turma { get; set; }

    }

    public class TopicoPlano
    {
        [Key]
        [Required]
        [DisplayName("Id")]
        public int Id { get; set; }

        [Required]
        public int TopicoId { get; set; }

        [DisplayName("Topico")]
        [ForeignKey("TopicoId")]
        public Topico Topico { get; set; }

        [Required]
        public int TurmaId { get; set; }

        [DisplayName("Turma")]
        [ForeignKey("TurmaId")]
        public Turma Turma { get; set; }

    }
}