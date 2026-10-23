import React from 'react'
import style from "./loader.module.css"

function Loader() {
  return (
    <section className="min-h-[60vh] w-full flex items-center justify-center">
        <div className={style.container} role="status" aria-label="Loading">
            {Array.from({ length: 12 }, (_, i) => (
                <div key={i} className={style.element}></div>
            ))}
        </div>
    </section>
  )
}

export default Loader;
