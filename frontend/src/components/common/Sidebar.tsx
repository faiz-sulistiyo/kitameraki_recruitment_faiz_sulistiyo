import * as React from 'react';
import { Nav, INavStyles, INavLinkGroup } from '@fluentui/react/lib/Nav';
import { routes } from '../../routes';

const navStyles: Partial<INavStyles> = {
  root: {
    width: 208,
    boxSizing: 'border-box',
    overflowY: 'auto',
  },
  // these link styles override the default truncation behavior
  link: {
    whiteSpace: 'normal',
    lineHeight: 'inherit',
  },
};

// adding an empty title string to each link removes the tooltip;
// it's unnecessary now that the text wraps, and will not truncate


const SideBar: React.FunctionComponent = () => {
  const navLinkGroups = routes[0]?.children?.map((item)=>{
    return {
      links: [
        {
          name:item.id,
          url:item.path,
          key:item.id,
          isExpanded: !!item.children?.length,
          expandAriaLabel: (!!item.children?.length) && item.id,
          links: item.children?.filter(
            (route) =>
              !["create", "edit", "detail"].some((exclude) =>
                route.path?.includes(exclude)
              )
          ).map((subItem)=>{
            return {
              name:subItem.id,
              url: subItem.index ? subItem.path : `${item.path}/${subItem.path}`,
              key:subItem.id,
            }
          }) || undefined
        }
      ]
    }
  });

  console.log(navLinkGroups);
  return (
    <div className='flex flex-col border h-screen sticky top-0'>
      <h1 className='text-center font-bold p-6'>My Task</h1>
      <Nav selectedKey="key6" ariaLabel="Nav example with wrapped link text" styles={navStyles} groups={navLinkGroups as INavLinkGroup[]} />
    </div>
  );
};

export default SideBar;
