import { connect } from 'react-redux';
import React, { Component } from 'react'
import { login } from '../../actions/auth.actions';
import { RouteComponentProps } from 'react-router';
import { IAuthState, IState } from '../../reducers';
import { Form, Input, Button, Container, FormGroup, Label } from 'reactstrap';

import logo from '../../assets/td.png';

interface ILoginProps extends RouteComponentProps {
    auth: IAuthState,
    login: (credentials: any, history: any) => any
}

interface ILoginComponentState {

    credentials: {
        username: string
        password: string
    },
    errorMessage?: string
}

export class LoginComponent extends Component<ILoginProps, ILoginComponentState> {
    constructor(props: any) {
        super(props);
        this.state = {
            credentials: {
                username: '',
                password: ''
            }
        }
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        this.setState({
            credentials: {
                ...this.state.credentials,
                [name]: event.target.value
            }
        });
    }

    submit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        this.props.login(this.state.credentials, this.props.history);
    }

    render() {
        const errorMessage = this.props.auth.errorMessage;
        return (
            <div>
                <Container className="mt-5 pt-5">
                    <Form className="form-signin" onSubmit={this.submit}>
                        <FormGroup className="mb-4">
                            <img className="w-250" src={logo} />
                        </FormGroup>
                        <FormGroup className="form-label-group">
                            <Input id="inputUsername"
                                name="username"
                                type="text"
                                placeholder="Username"
                                value={this.state.credentials.username}
                                onChange={this.handleChange}
                                required
                                autoFocus />
                            <Label for="inputUsername">Username</Label>
                        </FormGroup>
                        <FormGroup className="form-label-group">
                            <Input id="inputPassword"
                                name="password"
                                type="password"
                                placeholder="Password"
                                value={this.state.credentials.password}
                                onChange={this.handleChange}
                                required />
                            <Label for="inputPassword">Password</Label>
                        </FormGroup>
                        <FormGroup>
                            {errorMessage && <p className="text-danger" id="error-message">{errorMessage}</p>}
                        </FormGroup>
                        <FormGroup>
                            <Button size="lg" block type="submit">Submit</Button>
                        </FormGroup>
                    </Form>
                </Container>
            </div>
        )
    }
}


// public username = '',
// public password = '',
// public firstName = '',
// public lastName = '',
// public email = '',

const mapStateToProps = (state: IState) => ({
    auth: state.auth
})

const mapDispatchToProps = {
    login
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent)
