import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { turma } from './FetchTurma';
import { curso } from './FetchCurso';
import { semestre } from './FetchSemestre';
import { usuario } from './FetchUsuario';
import { disciplina } from './FetchDisciplina';

interface AddTurmaState {
    title: string;
    loading: boolean;
    cursoLista: Array<any>;  
    semestreLista: Array<any>;  
    professorLista: Array<any>;  
    disciplinaLista: Array<any>;  
    dados: turma;
}


export class AddTurma extends React.Component<RouteComponentProps<{}>, AddTurmaState> {
    constructor(props) {
        super(props);

        this.state = { title: "", loading: true, cursoLista: [], semestreLista: [], professorLista: [], disciplinaLista: [], dados: new turma };

        fetch('api/Turmas/Cursos')
            .then(response => response.json() as Promise<Array<any>>)
            .then(data => {
                this.setState({ cursoLista: data });
            });  

        fetch('api/Turmas/Semestres')
            .then(response => response.json() as Promise<Array<any>>)
            .then(data => {
                this.setState({ semestreLista: data });
            }); 

        fetch('api/Turmas/Professores')
            .then(response => response.json() as Promise<Array<any>>)
            .then(data => {
                this.setState({ professorLista: data });
            }); 

        fetch('api/Turmas/Disciplinas')
            .then(response => response.json() as Promise<Array<any>>)
            .then(data => {
                this.setState({ disciplinaLista: data });
            }); 

        var turmaid = this.props.match.params["id"];

        if (turmaid > 0) {
            fetch('api/Turmas/' + turmaid)
                .then(response => response.json() as Promise<turma>)
                .then(data => {
                    this.setState({ title: "Editar", loading: false, dados: data });
                });
        }


        else {
            this.state = { title: "Adicionar", loading: false, cursoLista: [], semestreLista: [], professorLista: [], disciplinaLista: [], dados: new turma };
            this.state.dados.Curso = new curso;
            this.state.dados.Curso.Id = 0;
            this.state.dados.Semestre = new semestre;
            this.state.dados.Semestre.Id = 0;
            this.state.dados.Professor = new usuario;
            this.state.dados.Professor.Id = 0;
            this.state.dados.Disciplina = new disciplina;
            this.state.dados.Disciplina.Id = 0;
        } 


        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderCreateForm(this.state.cursoLista, this.state.semestreLista, this.state.professorLista, this.state.disciplinaLista);

        return <div>
            <h1>{this.state.title}</h1>
            <h3>Turma</h3>
            <hr />
            {contents}
        </div>;
    }


    private handleSave(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        console.log(this.state.dados.Id);

        if (this.state.dados.Id) {
            fetch('api/Turmas/' + this.state.dados.Id, {
                method: 'PUT',
                body: data


            }).then((response) => { this.props.history.push("/fetchturma") });
        }


        else {
            fetch('api/Turmas', {
                method: 'POST',
                body: data,

            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/fetchturma");
                })
        }
    }


    private handleCancel(e) {
        e.preventDefault();
        this.props.history.push("/fetchturma");
    }

    private renderCreateForm(cursoLista: Array<any>, semestreLista: Array<any>, professorLista: Array<any>, disciplinaLista: Array<any>) {
        return (
            <form onSubmit={this.handleSave} >
                <div className="form-group row" >
                    <input type="hidden" name="Id" value={this.state.dados.Id} />
                </div>

                <div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="Nome">Nome da turma</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="Nome" defaultValue={this.state.dados.Nome.trim()} required />
                    </div>
                </div >

                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="SemestreId">Semestre</label>
                    <div className="col-md-4">
                        <select className="form-control" data-val="true" name="SemestreId" defaultValue={("" + this.state.dados.Semestre.Id) || "0"} required>
                            <option value="">-- Selecionar Semestre --</option>
                            {semestreLista.map(semestre =>
                                <option key={semestre.Id} value={semestre.Id}>{semestre.Id}</option>
                            )}
                        </select>
                    </div>
                </div >

                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="DisciplinaId">Disciplina</label>
                    <div className="col-md-4">
                        <select className="form-control" data-val="true" name="DisciplinaId" defaultValue={("" + this.state.dados.Disciplina.Id) || "0"} required>
                            <option value="">-- Selecionar Disciplina --</option>
                            {disciplinaLista.map(disciplina =>
                                <option key={disciplina.Id} value={disciplina.Id}>{disciplina.Nome}</option>
                            )}
                        </select>
                    </div>
                </div >

                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="CursoId">Curso</label>
                    <div className="col-md-4">
                        <select className="form-control" data-val="true" name="CursoId" defaultValue={(""+this.state.dados.Curso.Id) || "0"} required>
                            <option value="">-- Selecionar Curso --</option>
                            {cursoLista.map(curso =>
                                <option key={curso.Id} value={curso.Id}>{curso.Nome}</option>
                            )}
                        </select>
                    </div>  
                </div >

                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="Horario">Horario</label>
                    <div className="col-md-4">
                        <select className="form-control" data-val="true" name="Horario" defaultValue={"00:00"} required>
                            <option value="00:00">00:00</option>
                            <option value="00:30">00:30</option>
                            <option value="01:00">01:00</option>
                            <option value="01:30">01:30</option>
                            <option value="02:00">02:00</option>
                            <option value="02:30">02:30</option>
                            <option value="03:00">03:00</option>
                            <option value="03:30">03:30</option>
                            <option value="04:00">04:00</option>
                            <option value="04:30">04:30</option>
                            <option value="05:00">05:00</option>
                            <option value="05:30">05:30</option>
                            <option value="06:00">06:00</option>
                            <option value="06:30">06:30</option>
                            <option value="07:00">07:00</option>
                            <option value="07:30">07:30</option>
                            <option value="08:00">08:00</option>
                            <option value="08:30">08:30</option>
                            <option value="09:00">09:00</option>
                            <option value="09:30">09:30</option>
                            <option value="10:00">10:00</option>
                            <option value="10:30">10:30</option>
                            <option value="11:00">11:00</option>
                            <option value="11:30">11:30</option>
                            <option value="12:00">12:00</option>
                            <option value="12:30">12:30</option>
                            <option value="13:00">13:00</option>
                            <option value="13:30">13:30</option>
                            <option value="14:00">14:00</option>
                            <option value="14:30">14:30</option>
                            <option value="15:00">15:00</option>
                            <option value="15:30">15:30</option>
                            <option value="16:00">16:00</option>
                            <option value="16:30">16:30</option>
                            <option value="17:00">17:00</option>
                            <option value="17:30">17:30</option>
                            <option value="18:00">18:00</option>
                            <option value="18:30">18:30</option>
                            <option value="19:00">19:00</option>
                            <option value="19:30">19:30</option>
                            <option value="20:00">20:00</option>
                            <option value="20:30">20:30</option>
                            <option value="21:00">21:00</option>
                            <option value="21:30">21:30</option>
                            <option value="22:00">22:00</option>
                            <option value="22:30">22:30</option>
                            <option value="23:00">23:00</option>
                            <option value="23:30">23:30</option>
                        </select>
                    </div>
                </div >

                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="ProfessorId">Professor</label>
                    <div className="col-md-4">
                        <select className="form-control" data-val="true" name="ProfessorId" defaultValue={("" + this.state.dados.Professor.Id) || "0"} required>
                            <option value="">-- Selecionar Professor --</option>
                            {professorLista.map(professor =>
                                <option key={professor.Id} value={professor.Id}>{professor.Nome}</option>
                            )}
                        </select>
                    </div>
                </div >

                <div className="form-group">
                    <button type="submit" className="btn btn-default">Salvar</button>
                    <button className="btn" onClick={this.handleCancel}>Cancelar</button>
                </div >
            </form >
        )
    }
}  