import { useState } from 'react'

import ProjectSideBar from "./components/ProjectSideBar";
import NoProjectSelected from "./components/NoProjectSelected";
import NewProject from "./components/NewProject";
import SelectedProject from './components/SelectedProject';

function App() {
  const [projectState, setProjectState] = useState({
    projects: [],
    selectedProjectId: undefined,
    tasks: []
  })
  const handleAddTask = (text) => {
    setProjectState(prevState => {

      const newTask = {
        text: text,
        projectId: prevState.selectedProjectId,
        id: Date.now()
      }
      return {
        ...prevState, 
        tasks: [newTask, ...prevState.tasks]
      }
    })
  }
  const handleDeleteTask = (id) => {
    setProjectState(prevState => ({

      ...prevState, 
      tasks: prevState.tasks.filter((task) => 
        task.id !== id
      )
    }))
  }
  const handleStartAddProject = () => {
    setProjectState(prevState => ({

      ...prevState,
      selectedProjectId: null
    }))
  }
  const handleCancelAddProject = () => {
    setProjectState(prevState => ({

      ...prevState,
      selectedProjectId: undefined
    }))
  }
  const handleSelectProject = (id) => {
    setProjectState(prevState => ({...prevState, selectedProjectId: id}))

  }
  const handleAddProject = (projectData) => {
    setProjectState(prevState => {

      const newProject = {
        ...projectData,
        id: Date.now()
      }
      return {
        ...prevState, 
        selectedProjectId:undefined,
        projects: [...prevState.projects ,newProject]
      }
    })
  }
  const handleDeleteProject = () => {
    setProjectState(prevState => ({

      ...prevState, 
      selectedProjectId: undefined,
      projects: prevState.projects.filter((project) => 
        project.id !== prevState.selectedProjectId
      )
    }))
  }
  const selectProject = projectState.projects.find(project => project.id === projectState.selectedProjectId)
  let content =  <SelectedProject 

    project={selectProject} 
    onDelete={handleDeleteProject}
    tasks={projectState.tasks}
    onAddTask={handleAddTask}
    onDeleteTask={handleDeleteTask}
  />
  if(projectState.selectedProjectId === null){
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject}/>

  } else if(projectState.selectedProjectId === undefined){
    content = <NoProjectSelected onStartAddProject={handleStartAddProject}/>
  }
  return (
    <main className="h-screen my-8 flex gap-8">

      <ProjectSideBar 
        onSelectProject={handleSelectProject}
        onStartAddProject={handleStartAddProject} 
        projects={projectState.projects} 
        selectedProjectId={projectState.selectedProjectId}
        />
      {content}
    </main>
  );
}

export default App;
