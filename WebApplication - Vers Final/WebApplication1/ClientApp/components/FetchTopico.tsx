import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { curso } from './FetchCurso';


interface FetchTopicoExampleState {
    list: topico[];
    loading: boolean;
}

export class FetchTopico extends React.Component<RouteComponentProps<{}>, FetchTopicoExampleState> {

    constructor() {
        super();
        this.state = { list: [], loading: true };

        fetch('api/Topicos')
            .then(response => response.json() as Promise<topico[]>)
            .then(data => {
                console.log(data);
                this.setState({ list: data, loading: false });
            });

        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this); 
    }

    private handleDelete(id: number, nome: string) {
        if (!confirm("Você realmente deseja excluir o tópico/aula: " + nome))
            return;
        else {
            fetch('api/Topicos/' + id, {
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
        this.props.history.push("/Topico/editar/" + id);
    } 

    private renderlistTable(list: topico[]) {

        return <table className='table'>
            <thead>
                <tr>
                    <th>Descrição do Tópico/Aula</th>
                    <th>Curso</th>
                </tr>
            </thead>
            <tbody>
                {list.map(topico =>
                    <tr key={topico.Id}>
                        <td>{topico.Nome}</td>
                        <td>{topico.Curso.Nome}</td>
                        <td>
                            <a className="action" onClick={(id) => this.handleEdit(topico.Id)}>Editar</a>  |
                            <a className="action" onClick={(id) => this.handleDelete(topico.Id, topico.Nome)}> Remover   </a>  
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
            <h1>Tópicos</h1>
            <p>Lista de tópicos/aulas cadastrados. Todos os tópicos estão vinculadas a um curso.</p>
            {contents}
            <button className="btn btn-primary" onClick={()=>this.props.history.push("/Topico/adicionar/")}>Adicionar</button>
        </div>;

    }
                        
    
}

export class topico {
    Id: number = 0;
    Nome: string = "";
    Curso: curso;
}