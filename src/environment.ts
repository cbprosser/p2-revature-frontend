const dev = {
    context: 'http://localhost:8012'
}

const prod = {
    context: 'http://td-api.us-east-1.elasticbeanstalk.com/'
}

export let environment = prod;
//export let environment = dev;

if (process.env.NODE_ENV === 'production' || process.env.REACT_APP_ENV === 'production') {
    environment = prod;
}