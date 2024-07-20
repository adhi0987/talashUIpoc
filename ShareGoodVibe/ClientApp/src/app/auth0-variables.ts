interface AuthConfig {
    clientID: string;
    domain: string;
    callbackURL: string;
    apiUrl: string;
}

export const AUTH_CONFIG: AuthConfig = {
    clientID: 'nnC1nPUIsJYbUSTPtTOREfDzjL0gfZ4I',
    domain: 'panchu.au.auth0.com',
    callbackURL: 'http://localhost:8840/',
    apiUrl: 'https://panchu.au.auth0.com/api/v2/'
};
