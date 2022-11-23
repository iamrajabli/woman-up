import Routers from "./routers/Routers";

import AuthProvider from "./app/contexts/AuthProvider";

const App = () => (
    <AuthProvider>
        <Routers />
    </AuthProvider>
)

export default App;