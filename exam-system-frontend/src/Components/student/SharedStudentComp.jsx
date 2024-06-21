import React from 'react'
import NavbarComp from './NavbarComp'
import { Outlet } from 'react-router-dom'
import FooterComp from './FooterComp'

export default function SharedStudentComp() {
  return (
    <>
        <NavbarComp/>
        <Outlet/>
        <FooterComp/>
    </>
  )
}
