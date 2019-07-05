export const isAuthorized = (ctx: any) => ctx.headers.authorization === process.env.CLIENT_PASSWORD;
