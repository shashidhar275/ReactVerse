import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';
import Home from './Home';
import NewPost from './NewPost';
import PostPage from './PostPage';
import EditPost from './EditPost';
import About from './About';
import Missing from './Missing';
import { Route, Switch } from 'react-router-dom';
import { DataProvider } from './context/DataContext';

function App() {
  return (
    <div className="App">
      <Header title="React JS Blog"/>
      <DataProvider>
        <Nav />
        {/* Inside of a switch is like a waterfall as soon as it matches with the path that's what it delivers*/}
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/post" component={NewPost} />
          <Route exact path="/edit/:id" component={EditPost} />
          <Route path="/post/:id" component={PostPage} />
          <Route path="/about" component={About}/>{/*This one syntax used different then above both do perform same operation since about and missing functional components do not use any props hence we are using this simple syntax*/}
          <Route path="*" component={Missing}/>
        </Switch>
      </DataProvider>
        <Footer />
    </div>
  );
}

export default App;
