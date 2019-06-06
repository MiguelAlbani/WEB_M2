import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { usuario } from './FetchUsuario';


interface FetchCursoExampleState {
    list: curso[];
    loading: boolean;
}

export class FetchCurso extends React.Component<RouteComponentProps<{}>, FetchCursoExampleState> {

    constructor() {
        super();
        this.state = { list: [], loading: true };

        fetch('api/Cursos')
            .then(response => response.json() as Promise<curso[]>)
            .then(data => {
                console.log(data);
                this.setState({ list: data, loading: false });
            });

        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this); 
    }

    private handleDelete(id: number, nome: string) {
        if (!confirm("Você realmente deseja excluir o curso: " + nome))
            return;
        else {
            fetch('api/Cursos/' + id, {
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
        this.props.history.push("/Curso/editar/" + id);
    } 

    private renderlistTable(list: curso[]) {

        return <table className='table'>
            <thead>
                <tr>
                    <th>Nome do Curso</th>
                    <th>Prof. Coordenador (NDE)</th>
                </tr>
            </thead>
            <tbody>
                {list.map(curso =>
                    <tr key={curso.Id}>
                        <td>{curso.Nome}</td>
                        <td>{curso.Coordenador.Nome}</td>
                        <td>
                            <a className="action" onClick={(id) => this.handleEdit(curso.Id)}>Editar</a>  |  
                            <a className="action" onClick={(id) => this.handleDelete(curso.Id, curso.Nome)}> Remover   </a>  
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
            <h1>Cursos</h1>
            <p>Cursos existentes. Todos os cursos possuem um professor coordenador.</p>
            {contents}
            <button className="btn btn-primary" onClick={()=>this.props.history.push("/Curso/adicionar/")}>Adicionar</button>
        </div>;

    }
                        
    
}

export class curso {
    Id: number = 0;
    Nome: string = "";
    Coordenador: usuario;
}