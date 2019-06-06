import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { curso } from './FetchCurso';


interface FetchObjetivoExampleState {
    list: objetivo[];
    loading: boolean;
}

export class FetchObjetivo extends React.Component<RouteComponentProps<{}>, FetchObjetivoExampleState> {

    constructor() {
        super();
        this.state = { list: [], loading: true };

        fetch('api/Objetivos')
            .then(response => response.json() as Promise<objetivo[]>)
            .then(data => {
                console.log(data);
                this.setState({ list: data, loading: false });
            });

        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this); 
    }

    private handleDelete(id: number, nome: string) {
        if (!confirm("Você realmente deseja excluir o objetivo: " + nome))
            return;
        else {
            fetch('api/Objetivos/' + id, {
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
        this.props.history.push("/Objetivo/editar/" + id);
    } 

    private renderlistTable(list: objetivo[]) {

        return <table className='table'>
            <thead>
                <tr>
                    <th>Descrição do Objetivo</th>
                    <th>Curso</th>
                </tr>
            </thead>
            <tbody>
                {list.map(objetivo =>
                    <tr key={objetivo.Id}>
                        <td>{objetivo.Descricao}</td>
                        <td>{objetivo.Curso.Nome}</td>
                        <td>
                            <a className="action" onClick={(id) => this.handleEdit(objetivo.Id)}>Editar</a>  |
                            <a className="action" onClick={(id) => this.handleDelete(objetivo.Id, objetivo.Descricao)}> Remover   </a>  
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
            <h1>Objetivos</h1>
            <p>Lista de objetivos cadastrados. Todos os objetivos estão vinculadas a um curso.</p>
            {contents}
            <button className="btn btn-primary" onClick={()=>this.props.history.push("/Objetivo/adicionar/")}>Adicionar</button>
        </div>;

    }
                        
    
}

export class objetivo {
    Id: number = 0;
    Descricao: string = "";
    Curso: curso;
}