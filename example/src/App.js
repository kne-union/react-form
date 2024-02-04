import { HashRouter } from "react-router-dom";
import createEntry from "@kne/modules-dev/dist/create-entry";
import "@kne/modules-dev/dist/create-entry.css";
import readme from "readme";

const ExampleRoutes = createEntry.ExampleRoutes;

const App = ({ preset, themeToken, ...props }) => {
  return (
      <HashRouter>
        <ExampleRoutes
            {...props}
            paths={[
              {
                key: "components",
                path: "/",
                title: "首页",
              },
            ]}
            preset={preset}
            themeToken={themeToken}
            readme={readme}
        />
      </HashRouter>
  );
};

export default App;
