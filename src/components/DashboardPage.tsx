import React from 'react'
import SideBar from './SideBar';
import Content from './Content';


function DashboardPage() {
    
  return (
    <div className="flex h-screen"> {/* Flex container for sidebar and content */}
    <SideBar /> {/* Your sidebar on the left */}
    
    <div className="flex-1 p-4"> {/* Main content area */}
      <Content /> {/* Your content component or content here */}
    </div>
  </div>
  )
}

export default DashboardPage