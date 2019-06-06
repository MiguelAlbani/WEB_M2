import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { curso } from './FetchCurso';


interface FetchLivroExampleState {
    list: livro[];
    loading: boolean;
}

export class FetchLivro extends React.Component<RouteComponentProps<{}>, FetchLivroExampleState> {

    constructor() {
        super();
        this.state = { list: [], loading: true };

        fetch('api/Livros')
            .then(response => response.json() as Promise<livro[]>)
            .then(data => {
                console.log(data);
                this.setState({ list: data, loading: false });
            });

        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this); 
    }

    private handleDelete(id: number, nome: string) {
        if (!confirm("Você realmente deseja excluir o livro: " + nome))
            return;
        else {
            fetch('api/Livros/' + id, {
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
        this.props.history.push("/Livro/editar/" + id);
    } 

    private renderlistTable(list: livro[]) {

        return <table className='table'>
            <thead>
                <tr>
                    <th>Descrição do Livro</th>
                    <th>Curso</th>
                </tr>
            </thead>
            <tbody>
                {list.map(livro =>
                    <tr key={livro.Id}>
                        <td>{livro.Nome}</td>
                        <td>{livro.Curso.Nome}</td>
                        <td>
                            <a className="action" onClick={(id) => this.handleEdit(livro.Id)}>Editar</a>  |
                            <a className="action" onClick={(id) => this.handleDelete(livro.Id, livro.Nome)}> Remover   </a>  
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
            <h1>Livros</h1>
            <p>Lista de livros cadastrados. Todos os livros estão vinculadas a um curso.</p>
            {contents}
            <button className="btn btn-primary" onClick={()=>this.props.history.push("/Livro/adicionar/")}>Adicionar</button>
        </div>;

    }
                        
    
}

export class livro {
    Id: number = 0;
    Nome: string = "";
    Curso: curso;
}