import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { curso } from './FetchCurso';


interface FetchHabilidadeExampleState {
    list: habilidade[];
    loading: boolean;
}

export class FetchHabilidade extends React.Component<RouteComponentProps<{}>, FetchHabilidadeExampleState> {

    constructor() {
        super();
        this.state = { list: [], loading: true };

        fetch('api/Habilidades')
            .then(response => response.json() as Promise<habilidade[]>)
            .then(data => {
                console.log(data);
                this.setState({ list: data, loading: false });
            });

        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this); 
    }

    private handleDelete(id: number, nome: string) {
        if (!confirm("Você realmente deseja excluir o habilidade: " + nome))
            return;
        else {
            fetch('api/Habilidades/' + id, {
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
        this.props.history.push("/Habilidade/editar/" + id);
    } 

    private renderlistTable(list: habilidade[]) {

        return <table className='table'>
            <thead>
                <tr>
                    <th>Descrição da Habilidade</th>
                    <th>Curso</th>
                </tr>
            </thead>
            <tbody>
                {list.map(habilidade =>
                    <tr key={habilidade.Id}>
                        <td>{habilidade.Descricao}</td>
                        <td>{habilidade.Curso.Nome}</td>
                        <td>
                            <a className="action" onClick={(id) => this.handleEdit(habilidade.Id)}>Editar</a>  |
                            <a className="action" onClick={(id) => this.handleDelete(habilidade.Id, habilidade.Descricao)}> Remover   </a>  
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
            <h1>Habilidades</h1>
            <p>Lista de habilidades cadastradas. Todas as habilidades estão vinculadas a um curso.</p>
            {contents}
            <button className="btn btn-primary" onClick={()=>this.props.history.push("/Habilidade/adicionar/")}>Adicionar</button>
        </div>;

    }
                        
    
}

export class habilidade {
    Id: number = 0;
    Descricao: string = "";
    Curso: curso;
}