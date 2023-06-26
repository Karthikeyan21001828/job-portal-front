import './App.css';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import JobDirectoryComponent from './components/JobDirectoryComponent/JobDirectoryComponent';
import JobRegistrationComponent from './components/JobRegistrationComponent/JobRegistrationComponent';
import JobDeletionComponent from './components/JobDeletionComponent/JobDeletionComponent';
import HeaderComponent from './components/HeaderComponent/HeaderComponent';
import JobPortal from './JobPortal';
import React from 'react';

function App() {
  return (
    <JobPortal/>
  );
}

export default App;
