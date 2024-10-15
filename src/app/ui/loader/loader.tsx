import React from 'react'
import style from "./loader.module.css"

function Loader() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
        <div className={style.container}>
            <div className={style.element}></div>
            <div className={style.element} id='2'></div>
            <div className={style.element} id='3'></div>
            <div className={style.element} id='4'></div>
            <div className={style.element} id='5'></div>
            <div className={style.element} id='6'></div>
            <div className={style.element} id='7'></div>
            <div className={style.element} id='8'></div>
            <div className={style.element} id='9'></div>
            <div className={style.element} id='10'></div>
            <div className={style.element} id='11'></div>
            <div className={style.element} id='12'></div>
        </div>
    </div>
  )
}

export default Loader;