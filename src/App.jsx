import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import LoginPage from './pages/LoginPage/LoginPage';
import StudentDashboard from './pages/StudentDashboard/StudentDashboard';
import TeacherDashboard from './pages/TeacherDashboard/TeacherDashboard';
import GamePage from './pages/GamePage/GamePage';
import Game from './pages/Game/Game';
import StoryMode from './pages/StoryMode/StoryMode';
import StudentAsTeacher from './pages/StudentAsTeacher/StudentAsTeacher';
import MysteryBox from './pages/MysteryBox/MysteryBox';
import AvatarPage from './pages/AvatarPage/AvatarPage';
import GameGeneratorPreview from './pages/GameGeneratorPreview/GameGeneratorPreview';
import StudentAnalytics from './pages/StudentAnalytics/StudentAnalytics';
import GroupGameLobby from './pages/GroupGameLobby/GroupGameLobby';
import TimeMachine from './components/TimeMachine/TimeMachine';
import BakingFractions from '././games/BakingGame/BakingFractions';
import ChemistryGame from './games/ChemistryGame/ChemistryGame';
import FuelMyRideGame from './games/Photosenthesis/FuelMyRideGame';
import GameGenerator from './games/Photosenthesis/GameGenerator';
import Modes from './pages/Modes/mode';



function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route path="/student" component={StudentDashboard} />
        <Route path="/teacher" component={TeacherDashboard} />
        <Route path="/game" component={GamePage} />
        <Route path="/story" component={StoryMode} />
        <Route path="/teachmode" component={StudentAsTeacher} />
        <Route path="/mystery" component={MysteryBox} />
        <Route path="/avatar" component={AvatarPage} />
        <Route path="/preview" component={GameGeneratorPreview} />
        <Route path ="/singlegame" component={Game}/>
        <Route path="/analytics" component={StudentAnalytics} />
        <Route path="/group-game" component={GroupGameLobby} />
        <Route path="/time-machine" component={TimeMachine} />
        <Route path="/baking" component={BakingFractions} />
        <Route path="/chemistry" component={ChemistryGame} />
        <Route path="/photosynthesis" component={GameGenerator} />
        <Route path="/game-generator" component={GameGenerator} />
        <Route path="/fuel-my-ride" component={FuelMyRideGame} />
        <Route path= "/modes" component={Modes}/>
        




ذ      </Switch>
    </Router>
  );
}

export default App;
