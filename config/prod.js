import helmet from "helmet"
import compression from "compression"

const setupProdMiddleware = (app) => {
    app.use(helmet())
    app.use(compression())
};

export default setupProdMiddleware