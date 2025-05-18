
import Header from "./Header";
import Footer from "./Footer";
import RouterFrontend from "../../router/RouterFrontend";
import { useRoutes } from "react-router-dom";

const LayoutFrontend= () => {
    return (
        <div>
            <Header />
            <main>
                {useRoutes(RouterFrontend)}
            </main>
            <Footer />
        </div>
    );
};

export default LayoutFrontend;