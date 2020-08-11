export const environment = {
    production: false,
    region: "eu-west-1",
    rds:{
        hostname:"xxxxxx.eu-west-1.rds.amazonaws.com",
        port:5432,
        database:"expressServerlessAurora",
        secretId: "expressServerlessAuroraSecret"
    },
    ...process.env
};
