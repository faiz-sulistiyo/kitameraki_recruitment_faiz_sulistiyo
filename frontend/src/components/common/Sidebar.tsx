import * as React from "react"
import {
  Hamburger,
  NavCategory,
  NavCategoryItem,
  NavDrawer,
  NavDrawerBody,
  NavDrawerHeader,
  NavItem,
  NavSubItem,
  NavSubItemGroup,
} from "@fluentui/react-nav-preview"

import {Tooltip, makeStyles, tokens} from "@fluentui/react-components"
import {routes} from "../../routes"

const useStyles = makeStyles({
  root: {
    overflow: "hidden",
    display: "flex",
    height: "100vh",
    position: "sticky",
    top: 0,
    left: 0,
  },
  content: {
    flex: "1",
    display: "grid",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  field: {
    display: "flex",
    marginTop: "4px",
    marginLeft: "8px",
    flexDirection: "column",
    gridRowGap: tokens.spacingVerticalS,
  },
})

const SideBar = () => {
  const styles = useStyles()

  const [isOpen, setIsOpen] = React.useState(true)

  const renderHamburgerWithToolTip = () => {
    return (
      <Tooltip content="Navigation" relationship="label">
        <Hamburger onClick={() => setIsOpen(!isOpen)} />
      </Tooltip>
    )
  }

  return (
    <div className={styles.root}>
      <NavDrawer
        defaultSelectedValue="2"
        defaultSelectedCategoryValue="1"
        open={isOpen}
        type="inline"
        size="medium"
        style={{width:"200px"}}
      >
        <NavDrawerHeader>{renderHamburgerWithToolTip()}</NavDrawerHeader>
        <NavDrawerBody>
          {routes.map((route) => {
            return route.children?.map((item) => {
              if (!item.children?.length) {
                return (
                  <NavItem key={item.id} href={item.path} value={item.id}>
                    {item.id}
                  </NavItem>
                )
              } else {
                return (
                  <NavCategory key={item.id} value={item.id}>
                    <NavCategoryItem>{item.id}</NavCategoryItem>
                    <NavSubItemGroup key={item.id}>
                      {item.children?.filter(i=>i.index)?.map((subItem) => (
                        <NavSubItem
                          href={subItem.path}
                          key={subItem.id}
                          value={subItem.id}
                        >
                          {subItem.id}
                        </NavSubItem>
                      ))}
                    </NavSubItemGroup>
                  </NavCategory>
                )
              }
            })
          })}
        </NavDrawerBody>
      </NavDrawer>
      <div className={styles.content}>
        {!isOpen && renderHamburgerWithToolTip()}
      </div>
    </div>
  )
}

export default SideBar
