import background from '../../assets/quadras02.jpg';
import '../../styles/global.scss';
import './layout.scss';

function Layout({ children }) {
  return (
    <div className='layout'>
      <div className='background-container' />
      <div className='layout-content'>
        <div className='column-container'>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;
