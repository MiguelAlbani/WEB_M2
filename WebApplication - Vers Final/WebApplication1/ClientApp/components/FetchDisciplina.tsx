import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { usuario } from './FetchUsuario';


interface FetchDisciplinaExampleState {
    list: disciplina[];
    loading: boolean;
}

export class FetchDisciplina extends React.Component<RouteComponentProps<{}>, FetchDisciplinaExampleState> {

    constructor() {
        super();
        this.state = { list: [], loading: true };


        fetch('api/Disciplinas')
            .then(response => response.json() as Promise<disciplina[]>)
            .then(data => {
                console.log(data);
                this.setState({ list: data, loading: false });
            });

        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this); 
    }

    private handleDelete(id: number, nome: string) {
        if (!confirm("Você realmente deseja excluir a disciplina: " + nome))
            return;
        else {
            fetch('api/Disciplinas/' + id, {
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
        this.props.history.push("/Disciplina/editar/" + id);
    } 

    private renderlistTable(list: disciplina[]) {

        return <table className='table'>
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Nome da Disciplina</th>
                    <th>Prof. Responsável</th>
                </tr>
            </thead>
            <tbody>
                {list.map(disciplina =>
                    <tr key={disciplina.Id}>
                        <td>{disciplina.Codigo}</td>
                        <td>{disciplina.Nome}</td>
                        <td>{disciplina.Responsavel.Nome}</td>
                        <td>
                            <a className="action" onClick={(id) => this.handleEdit(disciplina.Id)}>Editar</a>  |  
                            <a className="action" onClick={(id) => this.handleDelete(disciplina.Id, disciplina.Nome)}> Remover   </a>  
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
            <h1>Disciplinas</h1>
            <p>Disciplinas existentes. Todas as disciplinas possuem um nome, código e professor responsável.</p>
            {contents}
            <button className="btn btn-primary" onClick={()=>this.props.history.push("/Disciplina/adicionar/")}>Adicionar</button>
        </div>;

    }
                        
    
}

export class disciplina {
    Id: number = 0;
    Nome: string = "";
    Codigo: string = "";
    Responsavel: usuario;
}