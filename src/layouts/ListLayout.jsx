import React from 'react'
import Loading from '../components/features/Loading'
import Header from '../components/ui/Header'
import BottomBar from '../components/features/BottomBar'
import { useNavigate } from 'react-router-dom'

const ListLayout = ({ children, addPath, title, loading }) => {
  const navigate = useNavigate();

  const handleAddClick = () => {
    navigate(addPath);
  }
  return (
    <>
      {loading ?
        <Loading /> :
        <div className="min-h-screen h-full flex-col flex-1 px-3 bg-neutral-100 dark:bg-neutral-950 py-4">
          <div className="py-2">
            <Header title={title} onAdd={handleAddClick} />
            <div className='pt-3 pb-14'>
              {children}
            </div>
          </div>
          <BottomBar />
        </div>
      }
    </>
  )
}

export default ListLayout