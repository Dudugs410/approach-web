import '../../styles/global.scss'
import './layout.scss'
import SidebarMenu from '../Componente_SidebarMenu'

function Layout({ children }) {
  return (
    <div className='layout'>
      <div className='layout-content'>
        <div className='column-container'>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Layout
