import cors from 'cors';

const corsOptional = {
    origin : 'http://localhost:3001',
    credentials : true
};

const corsMiddleware = (web) => {
    web.use(cors(corsOptional))
};

export default corsMiddleware;