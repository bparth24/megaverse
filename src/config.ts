import dotenv from 'dotenv';
dotenv.config();

export const config = {
    localhostUrl: process.env.LOCALHOST_URL || 'http://localhost',
    candidateId: process.env.CANDIDATE_ID || '8c1d20a9-c076-452d-be29-349953dd89d9',
    port: process.env.PORT || 3000,
    crossmintApiUrl: process.env.CROSSMINT_API_URL || 'https://challenge.crossmint.io/api'
};