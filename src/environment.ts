const dev = {
    context: 'http://localhost:8012'
}

const prod = {
    context: 'http://ers-api-react.s3-website-us-east-1.amazonaws.com'
}

export let environment = dev;

if (process.env.NODE_ENV === 'production' || process.env.REACT_APP_ENV === 'production') {
    environment = prod;
}