import { RouteObject } from "react-router-dom"
import { BrowserRouter, useRoutes } from "react-router-dom"
import { layoutRoutes } from "./utils/helper"
import routes from '~react-pages'
import Layout from '@/layouts'
import Login from '@/pages/login'

// 自动生成路径转换为layout嵌套路径
const layouts = layoutRoutes(routes)

function Router() {
  const newRoutes: RouteObject[] = [
    {
      path: "login",
      element: <Login />
    },
    {
      path: "",
      element: <Layout />,
      children: layouts
    }
  ]

  const App = () => {
    return (
      <>
        { useRoutes(newRoutes) }
      </>
    )
  }

  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
}

export default Router