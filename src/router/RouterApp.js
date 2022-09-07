import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PokemonListing from '../pages/pokemon/PokemonListing';
import PokemonDetail from '../pages/pokemon/PokemonDetail';
import NotFound from '../pages/notfound/NotFound';


export default function RouterApp() {

    return (
    <Router>
        <Routes>
            <Route path="/" element={<PokemonListing />} />
            <Route path="/detail/:name" element={<PokemonDetail />} />
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    </Router>
    )
}