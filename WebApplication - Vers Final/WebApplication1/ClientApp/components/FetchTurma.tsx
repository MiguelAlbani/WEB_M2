import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { curso } from './FetchCurso';
import { semestre } from './FetchSemestre';
import { usuario } from './FetchUsuario';
import { disciplina } from './FetchDisciplina';
import { competencia } from './FetchCompetencia';


interface FetchTurmaExampleState {
    list: turma[];
    loading: boolean;
}

export class FetchTurma extends React.Component<RouteComponentProps<{}>, FetchTurmaExampleState> {

    constructor() {
        super();
        this.state = { list: [], loading: true };


        if (localStorage.getItem('user').trim() != "professor") fetch('api/Turmas')
            .then(response => response.json() as Promise<turma[]>)
            .then(data => {
                console.log(data);
                this.setState({ list: data, loading: false });
            });

        if (localStorage.getItem('user').trim() == "professor") fetch('api/Turmas/Professor/' + localStorage.getItem('id').trim())
            .then(response => response.json() as Promise<turma[]>)
            .then(data => {
                console.log(data);
                this.setState({ list: data, loading: false });
            });

        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this); 
        this.handlePlano = this.handlePlano.bind(this); 
    }

    private handleDelete(id: number, nome: string) {
        if (!confirm("Você realmente deseja excluir a turma: " + nome))
            return;
        else {
            fetch('api/Turmas/' + id, {
                method: 'delete'
            }).then(data => {
                this.setState(
                    {
                        list: this.state.list.filter((item) => {
                            return (item.Id != id);
                        })
                    });
            });
        }
    }

    private handleEdit(id: number) {
        this.props.history.push("/Turma/editar/" + id);
    } 

    private handlePlano(id: number) {
        this.props.history.push("/Turma/plano/" + id);
    } 

    private renderlistTable(list: turma[]) {

        return <table className='table'>
            
            <thead>
                <tr>
                    <th>Turma</th>
                    <th>Semestre</th>
                    <th>Disciplina</th>
                    <th>Curso</th>
                    <th>Horário</th>
                    <th>Professor</th>
                </tr>
            </thead>
            <tbody>
             
                {localStorage.getItem('user').trim() == "nde" ? list.map(turma =>
                    <tr key={turma.Nome}>
                        <td>{turma.Nome}</td>
                        <td>{turma.Semestre.Id}</td>
                        <td>{turma.Disciplina.Nome}</td>
                        <td>{turma.Curso.Nome}</td>
                        <td>{turma.Horario}</td>
                        <td>{turma.Professor.Nome}</td>
                        <td>
                            <a className="action" onClick={(id) => this.handleEdit(turma.Id)}>Editar</a>  |
                            <a className="action" onClick={(id) => this.handleDelete(turma.Id, turma.Nome)}> Remover   </a>  
                        </td>  
                    </tr>
                    ) : list.map(turma =>
                        <tr key={turma.Nome}>
                            <td>{turma.Nome}</td>
                            <td>{turma.Semestre.Id}</td>
                            <td>{turma.Disciplina.Nome}</td>
                            <td>{turma.Curso.Nome}</td>
                            <td>{turma.Horario}</td>
                            <td>{turma.Professor.Nome}</td>
                            <td>
                                <a className="action" onClick={(id) => this.handlePlano(turma.Id)}>Plano de aula</a>
                            </td>
                        </tr>
                    )}
            </tbody>
        </table>;

    }
                                                    
    public render() {

       let contents = this.state.loading
                ? <p><em>Carregando...</em></p>
            : this.renderlistTable(this.state.list);

        return <div>
            <h1>Turmas</h1>
            <p>Lista de turmas existentes. Todas as turmas estão associadas a APENAS um curso.</p>
            {contents}
            {localStorage.getItem('user').trim() == "nde" ?
                <button className="btn btn-primary" onClick={() => this.props.history.push("/Turma/adicionar/")}>Adicionar</button> :
                <p></p>
            }
        </div>;

    }               
    
}

export class turma {
    Id: number = 0;
    Nome: string = "";
    Horario: string = "";
    Semestre: semestre;
    Professor: usuario;
    Disciplina: disciplina;
    Curso: curso;
}