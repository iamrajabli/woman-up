import Routers from "./routers/Routers";

import AuthProvider from "./app/contexts/AuthProvider";
import TodosProvider from "./app/contexts/TodosProvider";

const App = () => (
    <AuthProvider>
        <TodosProvider>
            <Routers />
        </TodosProvider>
    </AuthProvider>
)

export default App;