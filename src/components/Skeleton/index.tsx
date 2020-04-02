import React from 'react'

const Skeleton = () => {
  return (
    <div className="skeleton-wrap">
      <p className="skeleton-title" style={{ width: '38%' }} />
      <ul className="skeleton-paragraph">
        <li />
        <li />
        <li style={{ width: '61%' }} />
      </ul>
    </div>
  )
}

export default Skeleton