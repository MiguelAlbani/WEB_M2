import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { curso } from './FetchCurso';


interface FetchCompetenciaExampleState {
    list: competencia[];
    loading: boolean;
}

export class FetchCompetencia extends React.Component<RouteComponentProps<{}>, FetchCompetenciaExampleState> {

    constructor() {
        super();
        this.state = { list: [], loading: true };

        fetch('api/Competencias')
            .then(response => response.json() as Promise<competencia[]>)
            .then(data => {
                console.log(data);
                this.setState({ list: data, loading: false });
            });

        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this); 
    }

    private handleDelete(id: number, nome: string) {
        if (!confirm("Você realmente deseja excluir o competencia: " + nome))
            return;
        else {
            fetch('api/Competencias/' + id, {
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
        this.props.history.push("/Competencia/editar/" + id);
    } 

    private renderlistTable(list: competencia[]) {

        return <table className='table'>
            <thead>
                <tr>
                    <th>Nome da Competência</th>
                    <th>Curso</th>
                </tr>
            </thead>
            <tbody>
                {list.map(competencia =>
                    <tr key={competencia.Id}>
                        <td>{competencia.Descricao}</td>
                        <td>{competencia.Curso.Nome}</td>
                        <td>
                            <a className="action" onClick={(id) => this.handleEdit(competencia.Id)}>Editar</a>  |
                            <a className="action" onClick={(id) => this.handleDelete(competencia.Id, competencia.Descricao)}> Remover   </a>  
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
            <h1>Competências</h1>
            <p>Lista de competências cadastradas. Todas as competências estão vinculadas a um curso.</p>
            {contents}
            <button className="btn btn-primary" onClick={()=>this.props.history.push("/Competencia/adicionar/")}>Adicionar</button>
        </div>;

    }
                        
    
}

export class competencia {
    Id: number = 0;
    Descricao: string = "";
    Curso: curso;
}