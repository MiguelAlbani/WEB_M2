import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';


interface FetchUsuarioExampleState {
    list: usuario[];
    loading: boolean;
}

export class FetchUsuario extends React.Component<RouteComponentProps<{}>, FetchUsuarioExampleState> {

    constructor() {
        super();
        this.state = { list: [], loading: true };

        fetch('api/Usuarios')
            .then(response => response.json() as Promise<usuario[]>)
            .then(data => {
                console.log(data);
                this.setState({ list: data, loading: false });
            });

        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this); 
    }

    private handleDelete(id: number, nome: string) {
        if (!confirm("Você realmente deseja excluir o usuário: " + nome))
            return;
        else {
            fetch('api/Usuarios/' + id, {
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
        this.props.history.push("/Usuario/editar/" + id);
    } 

    private renderlistTable(list: usuario[]) {

        return <table className='table'>
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Usuário</th>
                    <th>Senha</th>
                    <th>Coordenador (NDE)</th>
                    <th>Admin</th>
                </tr>
            </thead>
            <tbody>
                {list.map(usuario =>
                    <tr key={usuario.Id}>
                        <td>{usuario.Nome}</td>
                        <td>{usuario.Login}</td>
                        <td>{usuario.Senha}</td>
                        <td>{usuario.NDE == true ? 'Sim' : 'Não'}</td>
                        <td>{usuario.Admin == true ? 'Sim' : 'Não'}</td>
                        <td>
                            <a className="action" onClick={(id) => this.handleEdit(usuario.Id)}>Editar</a>  |  
                            <a className="action" onClick={(id) => this.handleDelete(usuario.Id, usuario.Nome)}> Remover   </a>  
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
            <h1>Usuários</h1>
            <p>Usuários do sistema. Podem ser coordenadores (NDEs) ou administradores. Caso não sejam nem NDE, nem Admin, então são professores comuns.</p>
            {contents}
            <button className="btn btn-primary" onClick={()=>this.props.history.push("/Usuario/adicionar/")}>Adicionar</button>
        </div>;

    }
                        
    
}

export class usuario {
    Id: number;
    Nome: string = "";
    Login: string = "";
    Senha: string = "";
    Admin: boolean = false;
    NDE: boolean = false;
}