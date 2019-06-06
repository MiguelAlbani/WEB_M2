import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';

import { turma } from './FetchTurma';
import { competencia } from './FetchCompetencia';
import { habilidade} from './FetchHabilidade';
import { objetivo } from './FetchObjetivo';
import { topico } from './FetchTopico';
import { livro } from './FetchLivro';


interface FetchPlanoExampleState {
    competencias: planoCompetencia[];
    habilidades: planoHabilidade[];
    objetivos: planoObjetivo[];
    aulas: planoAula[];
    livros: planoLivro[];
    loading: boolean;
    id: number;
    professor: string;
    semestre: number;
    disciplina: string;
}

export class FetchPlano extends React.Component<RouteComponentProps<{}>, FetchPlanoExampleState> {

    constructor(props) {
        super(props);

        var turmaid = this.props.match.params["id"];
        this.state = { competencias: [], habilidades: [], objetivos: [], aulas: [], livros: [], loading: true, id: turmaid, professor: "", semestre: 0, disciplina: "" };

        fetch('api/Turmas/' + turmaid)
            .then(response => response.json() as Promise<turma>)
            .then(data => {
                this.setState({ professor: data.Professor.Nome, semestre: data.Semestre.Id, disciplina: data.Disciplina.Nome });
            });


        fetch('api/Plano/Competencias/' + turmaid)
            .then(response => response.json() as Promise<planoCompetencia[]>)
            .then(data => {
                this.setState({ competencias: data, loading: false});
            });

        fetch('api/Plano/Habilidades/' + turmaid)
            .then(response => response.json() as Promise<planoHabilidade[]>)
            .then(data => {
                this.setState({ habilidades: data, loading: false });
            });

        fetch('api/Plano/Objetivos/' + turmaid)
            .then(response => response.json() as Promise<planoObjetivo[]>)
            .then(data => {
                this.setState({ objetivos: data, loading: false });
            });

        fetch('api/Plano/Topicos/' + turmaid)
            .then(response => response.json() as Promise<planoAula[]>)
            .then(data => {
                this.setState({ aulas: data, loading: false });
            });

        fetch('api/Plano/Livros/' + turmaid)
            .then(response => response.json() as Promise<planoLivro[]>)
            .then(data => {
                this.setState({ livros: data, loading: false });
            });

        this.handleDelete = this.handleDelete.bind(this);
    }


    private handleDelete(id: number, nome: string, tipo: string) {
        if (!confirm("Você realmente deseja excluir: " + nome))
            return;
        else {
            fetch('api/Plano/'+tipo+'/' + id, {
                method: 'delete'
            }).then(data => {
                if(tipo == "Competencias") this.setState(
                    {
                        competencias: this.state.competencias.filter((item) => {
                            return (item.Id != id);
                        })
                    });
                if (tipo == "Habilidades") this.setState(
                    {
                        habilidades: this.state.habilidades.filter((item) => {
                            return (item.Id != id);
                        })
                    });
                if (tipo == "Objetivos") this.setState(
                    {
                        objetivos: this.state.objetivos.filter((item) => {
                            return (item.Id != id);
                        })
                    });
                if (tipo == "Topicos") this.setState(
                    {
                        aulas: this.state.aulas.filter((item) => {
                            return (item.Id != id);
                        })
                    });
                if (tipo == "Livros") this.setState(
                    {
                        livros: this.state.livros.filter((item) => {
                            return (item.Id != id);
                        })
                    });
            });
        }
    }

    private renderlistTableCompetencia(competencias: planoCompetencia[]) {

        return <table className='table'>
            
            <thead>
                <tr>
                    <th>Competências necessárias</th>
                </tr>
            </thead>
            <tbody>
                {competencias.map(plano =>
                    <tr key={plano.Id}>
                        <td style={{width:"80%"}}>{plano.Competencia.Descricao.trim()}</td>
                        <td>
                            <a className="action" onClick={(id) => this.handleDelete(plano.Id, plano.Competencia.Descricao, "Competencias")}> Remover </a>  
                        </td>  
                    </tr>
                  )}
            </tbody>
        </table>;

    }

    private renderlistTableHabilidade(habilidades: planoHabilidade[]) {

        return <table className='table'>

            <thead>
                <tr>
                    <th>Habilidades necessárias</th>
                </tr>
            </thead>
            <tbody>
                {habilidades.map(plano =>
                    <tr key={plano.Id}>
                        <td style={{ width: "80%" }}>{plano.Habilidade.Descricao.trim()}</td>
                        <td>
                            <a className="action" onClick={(id) => this.handleDelete(plano.Id, plano.Habilidade.Descricao, "Habilidades")}> Remover </a>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>;

    }

    private renderlistTableObjetivo(objetivos: planoObjetivo[]) {

        return <table className='table'>

            <thead>
                <tr>
                    <th>Objetivos buscados</th>
                </tr>
            </thead>
            <tbody>
                {objetivos.map(plano =>
                    <tr key={plano.Id}>
                        <td style={{ width: "80%" }}>{plano.Objetivo.Descricao}</td>
                        <td>
                            <a className="action" onClick={(id) => this.handleDelete(plano.Id, plano.Objetivo.Descricao, "Objetivos")}> Remover </a>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>;

    }

    private renderlistTableAula(aulas: planoAula[]) {

        return <table className='table'>

            <thead>
                <tr>
                    <th>Aulas/tópicos lecionados</th>
                </tr>
            </thead>
            <tbody>
                {aulas.map(plano =>
                    <tr key={plano.Id}>
                        <td style={{ width: "80%" }}>{plano.Topico.Nome}</td>
                        <td>
                            <a className="action" onClick={(id) => this.handleDelete(plano.Id, plano.Topico.Nome, "Topicos")}> Remover </a>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>;

    }
        

    private renderlistTableLivro(livros: planoLivro[]) {

        return <table className='table'>

            <thead>
                <tr>
                    <th>Livros sugeridos para a turma</th>
                </tr>
            </thead>
            <tbody>
                {livros.map(plano =>
                    <tr key={plano.Id}>
                        <td style={{ width: "80%" }}>{plano.Livro.Nome}</td>
                        <td>
                            <a className="action" onClick={(id) => this.handleDelete(plano.Id, plano.Livro.Nome, "Livros")}> Remover </a>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>;

    }
                                                    
    public render() {

       let contentsCompetencias = this.state.loading
           ? <p><em>Carregando...</em></p>
            : this.renderlistTableCompetencia(this.state.competencias);

        let contentsHabilidades = this.state.loading
            ? <p><em>Carregando...</em></p>
            : this.renderlistTableHabilidade(this.state.habilidades);

        let contentsObjetivos = this.state.loading
            ? <p><em>Carregando...</em></p>
            : this.renderlistTableObjetivo(this.state.objetivos);

        let contentsAulas = this.state.loading
            ? <p><em>Carregando...</em></p>
            : this.renderlistTableAula(this.state.aulas);

        let contentsLivros = this.state.loading
            ? <p><em>Carregando...</em></p>
            : this.renderlistTableLivro(this.state.livros);

        return <div>

            <h1>Plano de aula</h1>

            <span><b> Disciplina: </b>{this.state.disciplina} <b style={{ paddingLeft: "20px" }}> Semestre: </b>{this.state.semestre}<b style={{ paddingLeft: "20px" }}>  Professor: </b>{this.state.professor}</span>
            <p style={{ paddingBottom: "20px" }}></p>

            <p>Plano de aula para a turma especificada. É possível determinar as competências, habilidades e objetivos necessários, bem como as aulas/tópicos para a turma e os livros recomendados. </p>

            {contentsCompetencias}
            <button className="btn btn-secondary" onClick={() => this.props.history.push("/Turma/adicionarplano/"+this.state.id+"/competencia/")}>Adicionar competência</button>
            <p style={{ paddingBottom: "20px" }}></p>

            {contentsHabilidades}
            <button className="btn btn-secondary" onClick={() => this.props.history.push("/Turma/adicionarplano/" + this.state.id + "/habilidade/")}>Adicionar habilidade</button>
            <p style={{ paddingBottom: "20px" }}></p>

            {contentsObjetivos}
            <button className="btn btn-secondary" onClick={() => this.props.history.push("/Turma/adicionarplano/" + this.state.id + "/objetivo/")}>Adicionar objetivo</button>
            <p style={{ paddingBottom: "20px" }}></p>

            {contentsAulas}
            <button className="btn btn-secondary" onClick={() => this.props.history.push("/Turma/adicionarplano/" + this.state.id + "/topico/")}>Adicionar aula/tópico</button>
            <p style={{ paddingBottom: "20px" }}></p>

            {contentsLivros}
            <button className="btn btn-secondary" onClick={() => this.props.history.push("/Turma/adicionarplano/" + this.state.id + "/livro/")}>Adicionar livro</button>
            <p style={{ paddingBottom: "20px" }}></p>

        </div>;

    }
                               
}

export class planoCompetencia {
    Id: number = 0;
    Competencia: competencia;
}

export class planoHabilidade {
    Id: number = 0;
    Habilidade: habilidade;
}

export class planoObjetivo {
    Id: number = 0;
    Objetivo: objetivo;
}

export class planoAula {
    Id: number = 0;
    Topico: topico;
}

export class planoLivro {
    Id: number = 0;
    Livro: livro;
}