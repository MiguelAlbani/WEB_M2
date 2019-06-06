import * as React from 'react';
import { RouteComponentProps } from 'react-router';

export class Login extends React.Component<RouteComponentProps<{}>, {}> {

    constructor(props) {
        super(props);
        this.handleSave = this.handleSave.bind(this);
    }

    private handleSave(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        fetch('api/Usuarios/Login', {
            method: 'POST',
            body: data
        }).then((response) => {

            if (!response.ok) {
                alert("Login incorreto! Verifique seu nome de usuário ou senha.");
                localStorage.setItem('user', '');
                localStorage.setItem('id', '');
            }
            else {
                response.json().then(data => {
                    //alert(data.tipo);
                    localStorage.setItem('user', data.tipo);
                    localStorage.setItem('id', data.id);
                    this.props.history.push("/home");
                });
                
            }

            
        });


        
        
    }

    public render() {

        let contents = this.renderFormLogin();

        return <div>
            <h1>Login</h1>
            <p>É necessário fazer login e ter permissão para acessar essa página.</p>
            <div style={{ justifyContent: 'center', paddingTop:'20px', alignItems: 'center' }}>
            {contents}</div>
        </div>;
    }

    public renderFormLogin() {
        return (
            <form onSubmit={this.handleSave} >

                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="Login">Login (Usuário)</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="Login" required />
                    </div>
                </div >

                <div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="Senha">Senha</label>
                    <div className="col-md-4">
                        <input type="password" className="form-control" name="Senha" required />
                    </div>
                </div >
                
                <div className="form-group">
                    <button type="Login" className="btn btn-default">Login</button>
                </div >
            </form >
        )
    }
}
